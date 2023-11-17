const express = require("express");
const router = express.Router();

const { db } = require("../models/Result");

router.get("/", function (req, res) {
  res.send("Welcome to the result API");
});

router.post("/newresult", function (req, res) {
  const { student_id, grade, term, session, subject, score, remark } = req.body;
  db.none(
    "INSERT into public.results(student_id, grade, term, session, subject, score, remark) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [student_id, grade, term, session, subject, score, remark]
  ).then(() => {
    res.redirect('/res_proc.html')
  }).catch((error) => {
    console.error('Error creating reuslt:', error)
    res.status(500).json({error: "Internal Server error"})
  })
})

router.post("/checkresult", function (req, res) {
  const { student_id, session, term, password } = req.body;
  console.log({student_id, session, term, password})
   db.any(
     "SELECT students.surname as surname, students.othername as othername, students.department as Department, results.grade as Class, results.term as Term, results.subject as Subject, results.score as Score, results.session as Session, results.remark as Remark FROM public.students JOIN public.results ON students.student_id = results.student_id WHERE results.term = '" +
       term +
       "' AND results.session = '" +
       session +
     "' AND students.student_id = '"
     + student_id + "'"
   ).then((data) => {
     console.log(data);
     //res.send(data)
     res.render('result', { data, student_id });
   });
  
})

module.exports = router;
