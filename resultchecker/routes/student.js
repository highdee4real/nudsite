const express = require("express");
const router = express.Router();
const path = require('path');


const { db } = require("../models/Student");

router.get("/", function (req, res) {
    res.send("Welcome to the Student API")
})

router.post("/signup", function (req, res) {
    const { student_id, surname, othername, gender, grade, department, password } = req.body;
    db.none(
      "INSERT INTO public.students(student_id, surname, othername, gender, grade, department, password) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [student_id, surname, othername, gender, grade, department, password]
    ).then(() => {
      // Assuming "std_log.html" is in the "public" folder
      const filePath = path.join(__dirname, "../public", "std_log.html");

      // Send the file as a response
      res.sendFile(filePath);
      // res.status(200).json({ message: "Student created successfully"})
    }).catch((error) => {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Internal server error" });
    });
    
})

router.post("/login", function (req, res) {
    const { student_id, password } = req.body;
    db.any(
        "SELECT password FROM public.students where student_id = '"+student_id+"'"
    ).then((data) => {
        if (password == data[0].password) {
            const filePath = path.join(__dirname, "../public", "check.html");
            // Send the file as a response
            res.sendFile(filePath);
        } else {

            res.redirect('/std_log.html')
            //res.status(500).json({ error: "Incorrect Student Credentials" });
        }
    }).catch((error) => {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Internal server error" });
    })
})
module.exports = router;