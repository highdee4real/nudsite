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
      res.redirect("/dashboard.html");
    } else {
      res.redirect('/admin.html');
    }  
  } catch (error) {
      res.render('404')
    }
})


module.exports = router;