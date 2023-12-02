const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')

const { db } = require("../models/Staff");

router.get("/", function (req, res) {
    res.send("Welcome to the staff API")
})

router.post("/signup", async function (req, res) {
  const { staff_id, title, name, email, phonenumber, grades, department, password } = req.body;
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const query =
    "INSERT INTO public.staff(staff_id, title, name, email, phonenumber, grades, department, password) VALUES($1,$2,$3,$4,$5,$6,$7,$8)";
  const values = [
    staff_id,
    title,
    name,
    email,
    phonenumber,
    grades,
    department,
    hashedPassword,
  ];

  try {
    await db.query(query, values);
    await res.redirect("/staff_log.html")
  } catch (error) {
    console.log('Database query error:', error)
    res.render('404')
  }

});

router.post("/login", async function (req, res) {
  const { staff_id, password } = req.body;
    const query = "SELECT * FROM public.staff WHERE staff_id = $1";
    const values = staff_id[0];

    try {
        const result = await db.query(query, values);
        if (result) {
          const user = result[0];
            const passwordMatch = await bcrypt.compare(password[0], user.password);
            if (passwordMatch) {
              req.session.userID = user.staff_id; //Store's the user's ID in the session
              res.redirect('/res_proc.html')
            } else {
                res.redirect('/staff_log.html')
            }
        } else {
            res.redirect("/staff_log.html");
        }
    } catch (error) {
        console.error("Database query error:", error);
        res.redirect("/staff_log.html");
    }
})

router.post("/resetpassword", async function (req, res) {
  const { staff_id, password } = req.body;
  console.log({ staff_id, password });

  try {
    // Check if the user exists before attempting to update the password
    const checkQuery = "SELECT * FROM public.staff WHERE staff_id = $1";
    const checkValues = [staff_id];
    const checkResult = await db.query(checkQuery, checkValues);

    if (checkResult.rows === 0) {
      // User not found
      console.log("User not found");
      //res.redirect("/resetpass.html");
      return;
    }
    // User found, proceed with password update
    const saltRounds = 5; // Adjust the number of salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updateQuery =
      "UPDATE public.staff SET password = $1 WHERE staff_id = $2";
    const updateValues = [hashedPassword, staff_id];
    await db.query(updateQuery, updateValues);
    console.log("User updated successfully:");
    res.redirect("/staff_log.html");
  } catch (error) {
    console.error("Database Error", error);
    res.redirect("/staff_log.html");
  }
});

module.exports = router