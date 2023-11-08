const express = require("express");
const router = express.Router();

//const { db } = require("../models/Staff");

router.get("/", function (req, res) {
  res.send("Welcome to the Admin API");
});

router.post("/signup", function (req, res) {
    const { username, password } = req.body;
    if (username == "admin" && password == "pass") {
        res.status(200).json({ message: "Welcome Admin!!"})
    } else {
        res.status(500).json({ error: "Incorrect Admin Credentials"})
    }
})
module.exports = router;