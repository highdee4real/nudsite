const express = require("express");
const router = express.Router();


const { db } = require("../models/Student");

router.get("/", function (req, res) {
    res.send("Welcome to the Student API")
})

router.post("/signup", function (req, res) {
    const { student_id, surname, othername, gender, grade, department, password } = req.body;
    db.none(
      "INSERT INTO students(student_id, surname, othername, gender, grade, department, password) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [student_id, surname, othername, gender, grade, department, password]
    ).then(() => {
        res.status(200).json({ message: "Student created successfully"})
    }).catch((error) => {
        console.error("Error creating employee:", error);
        res.status(500).json({ error: "Internal server error" });
    });
})

router.post("/login", function (req, res) {
    const { student_id, password } = req.body;
    db.any(
        "SELECT password FROM students where student_id = '"+student_id+"'"
    ).then((data) => {
        if (password == data[0].password) {
            res.status(200).json({message: "Correct User Creadentials"})
        } else {
            res.status(500).json({ error: "Incorrect User Credentials" });
        }
    }).catch((error) => {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Internal server error" });
    })
})
module.exports = router;