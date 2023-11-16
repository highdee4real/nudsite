const express = require("express");
const router = express.Router();

const { db } = require("../models/Result");

router.get("/", function (req, res) {
  res.send("Welcome to the result API");
});

router.post("/newresult", function (req, res) {
  const { student_id, grade, term, session, subject, score } = req.body;
  db.none(
    "INSERT into public.results(student_id, grade, term, session, subject, score) VALUES ($1,$2,$3,$4,$5,$6)",
    [student_id, grade, term, session, subject, score]
  ).then(() => {
    res.status(200).json({ message: "New Result Added"})
  }).catch((error) => {
    console.error('Error creating reuslt:', error)
    res.status(500).json({error: "Internal Server error"})
  })
})

router.post("/checkresult", function (req, res) {
  const { student_id, session, term, password } = req.body;
  
   db.any(
     "SELECT students.surname as surname, students.othername as othername, students.department as Department, results.term as Term, results.subject as Subject, results.score as Score, results.session as Session FROM public.students JOIN public.results ON students.student_id = results.student_id WHERE results.term = '" +
       term +
       "' AND results.session = '" +
       session +
     "' AND students.student_id = '"
     + student_id + "'"
   ).then((data) => {
     console.log(data);
     res.status(200).json({ data: data });
   });
  // if (checkuser({ student_id, password })) {
  //   db.any(
  //     "SELECT students.surname as surname, students.othername as othername, students.student_id as Registeration Number, students.department as Department, results.term as Term, results.session as Session FROM public.students JOIN public.results ON students.student_id = results.student_id AND WHERE results.term = '"+term+"' AND results.session = '"+session+"'"
  //   ).then((data) => {
  //     console.log(data)
  //     res.status(200).json({data: data})
  //   })
  // }
  // function checkuser({ student_id, password }) {
  //   db.any(
  //     "SELECT * from public.students WHERE student_id = '"+student_id+"' and password = '"+password+"'"
  //   ).then(() => {
  //     return true
  //   }).catch((error) => {
  //     console.error({error: error})
  //     return false
  //   })
  // }
  
})

module.exports = router;
