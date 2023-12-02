const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


const { db } = require("../models/Student");
//const { sessiondb } = require("../models/Session");

router.get("/", function (req, res) {
    res.send("Welcome to the Student API")
})

router.post("/signup", async function (req, res) {
    const { student_id, surname, othername, gender, grade, department, password } = req.body;

    //Hash and salt the password
    const saltRounds = 5; //Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    //console.log(hashedPassword)

    const query =
        "INSERT INTO public.students(student_id, surname, othername, gender, grade, department, password) VALUES($1,$2,$3,$4,$5,$6,$7)";
    const values = [
      student_id,
      surname,
      othername,
      gender,
      grade,
      department,
      hashedPassword,
    ];

    try {
        await db.query(query, values)
        await res.redirect('/std_log.html')
    } catch (error) {
        console.log('Database query error:', error)
        res.status(500).send('Internal Server Error')
    }
})

router.post("/login", async function (req, res) {
    const { student_id, password } = req.body;

    const query = "SELECT * FROM public.students WHERE student_id = $1";
    const values = [student_id];

    try {
        const result = await db.query(query, values);
        if (result) {
            const user = result;
            console.log(user)
            console.log(password)
            const passwordMatch = await bcrypt.compare(password, user[0].password);

            if (passwordMatch) {
                req.session.userID = user[0].student_id; //Store's the user's ID in the session
                res.redirect('/check.html')
            } else {
                res.redirect('/std_log.html')
            }
        } else {
            res.redirect("/std_log.html");
        }
    } catch (error) {
        console.error("Database query error:", error);
        res.redirect("/std_log.html");
    }
})
module.exports = router;