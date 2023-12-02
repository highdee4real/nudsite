const express = require("express");
const router = express.Router();
const path = require('path');

const { db } = require("../models/Result");
const {isStudentAuth} = require("../middleware/Auth");

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
    res.redirect("/res_proc.html");
  })
})

router.post("/checkresult", isStudentAuth, async function (req, res) {
  const { student_id, session, term } = req.body;
   db.any(
     "SELECT students.surname as surname, students.othername as othername, students.department as Department, results.grade as Class, results.term as Term, results.subject as Subject, results.score as Score, results.session as Session, results.remark as Remark FROM public.students JOIN public.results ON students.student_id = results.student_id WHERE results.term = '" +
       term +
       "' AND results.session = '" +
       session +
     "' AND students.student_id = '"
     + student_id + "'"
   ).then((data) => {
     res.render('result', { data, student_id });     
   });
  
})

router.get('/update', function (req, res) {
  console.log(req.session.userID)
  res.render('update')
})

router.post("/updateresult", async function (req, res) {
  const { student_id, grade, term, session, subject, score, remark } = req.body;
  const query =
    "UPDATE public.results SET grade = $1, term = $2, session = $3, subject = $4, score = $5, remark = $6 WHERE student_id = $7";
  const values =
    [grade, term, session, subject, score, remark, student_id];

  try {
    await db.query(query, values);
    await res.redirect("/res_proc.html");
  } catch (error) {
    console.error("Database Error:", error)
    res.render('404')
  }
})

module.exports = router;
