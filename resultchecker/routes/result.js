const express = require("express");
const router = express.Router();

//const { db } = require("../models/Student");

router.get("/", function (req, res) {
  res.send("Welcome to the result API");
});

router.post("/newresult", function (req, res) {
    
})

module.exports = router;
