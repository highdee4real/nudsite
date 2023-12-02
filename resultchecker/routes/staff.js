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
  const saltRounds = 5;
  const hashedPassword = await bcrypt.hash(password[1], saltRounds)
  try {
    db.none(
    "UPDATE public.staff WHERE staff_id = '" +
      staff_id[1] +
      "' SET password = '" +
      hashedPassword +
      "'"
  )
    .then(() => {
      res.redirect("/staff_log.html");
    })
    .catch((error) => {
      console.error(error)
      res.redirect("/staff_log.html");
    });
  } catch (error) {
    console.error("Internal Server Error:", error)
    res.render('404')
  }
})

module.exports = router