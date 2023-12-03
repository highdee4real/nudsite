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
  ;
  const query = "SELECT students.surname as surname, students.othername as othername, students.department as Department, results.grade as Class, results.term as Term, results.subject as Subject, results.score as Score, results.session as Session, results.remark as Remark FROM public.students JOIN public.results ON students.student_id = results.student_id WHERE results.term = $1 AND results.session = $2 AND students.student_id = $3"
  const values = [term, session, student_id]

  try {
    const data = await db.query(query, values)
    res.render('result', {data, student_id})
    //console.log(result)
  } catch (error) {
    console.error("Database Error:", error)
    res.redirect("/check.html")
  }
  
})

router.get('/update', function (req, res) {
  //console.log(req.session.userID)
  res.redirect('/update.html')
})

router.post("/updateresult", async function (req, res) {
  const { student_id, grade, term, session, subject, score, remark } = req.body;
     
  try {
    const checkQuery = "SELECT * FROM public.results WHERE student_id = $1 AND subject = $2"
    const checkValues = [student_id, subject]
    const checkResult = await db.query(checkQuery, checkValues)

    if (checkResult.rows === 0) {
      
      res.redirect('/update.html')
      return
    } 

    const updateQuery = "UPDATE public.results SET score = $1, remark = $2, grade = $3, term = $4, session = $5 WHERE student_id = $6 AND subject = $7"
    const updateValues = [score, remark, grade, term, session, student_id, subject]
    await db.query(updateQuery, updateValues);
    console.log("Record updated successfully:");
    res.redirect("/res_proc.html");
  } catch (error) {
    console.error("Database Error", error)
    res.redirect("result/update")
  }
})
module.exports = router;
