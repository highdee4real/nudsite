const express = require("express");
const router = express.Router();

const { db } = require("../models/Result");

router.get("/", function (req, res) {
  res.send("Welcome to the Admin API");
});

router.post("/signup", function (req, res) {
  try {
    const { username, password } = req.body;
    if (username === "admin" && password === "pass") {
      res.redirect("/multires_proc.html");
    } else {
      res.redirect('/admin.html');
    }  
  } catch (error) {
      res.render('404')
    }
})

router.post("/addscoresheet", function (req, res) {
    const { student_id, term, grade, session, subject, score, remark } = req.body;
    try {
        for (let i = 0; i < subject.length; i++) {
          if (score[i] === "") {
            console.log("Enter the correct score");
          } else {
            db.none(
              "INSERT into public.results(student_id, grade, term, session, subject, score, remark) VALUES ($1,$2,$3,$4,$5,$6,$7)",
              [
                student_id,
                grade,
                term,
                session,
                subject[i],
                parseInt(score[i]),
                remark[i],
              ]
            )
              .then(() => {
                console.log("record added");
              })
              .catch((error) => {
                console.error("Error creating result:", error);
              });
          }
        }
    } catch (error) {
        res.status(500).json('Error Found')
   }
    res.redirect('/multires_proc.html')

    
});

module.exports = router;