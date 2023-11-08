const express = require("express");
const router = express.Router();

const { db } = require("../models/Staff");

router.get("/", function (req, res) {
    res.send("Welcome to the staff API")
})

router.post("/signup", function (req, res) {
  const { staff_id, title, name, email, phonenumber, grades, department, password } = req.body;
  
  db.none(
    "INSERT INTO public.staff(staff_id, title, name, email, phonenumber, grades, department, password) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [staff_id, title, name, email, phonenumber, grades, department, password]
  )
    .then(() => {
      res.status(200).json({ message: "New Staff Added!!" });
    })
    .catch((error) => {
      console.error("Error creating staff:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/login", function (req, res) {
  const { staff_id, password } = req.body;
  db.any(
    "SELECT password FROM public.staff WHERE staff_id = '"+staff_id+"'"
  ).then((data) => {
     if (password == data[0].password) {
       res.status(200).json({ message: "Correct User Creadentials" });
     } else {
       res.status(500).json({ error: "Incorrect User Credentials" });
     }
  }).catch((error) => {
    console.error("Error Fetching Staff ", error);
    res.status(500).json({ error: "Internal server error"})
  })
})

module.exports = router