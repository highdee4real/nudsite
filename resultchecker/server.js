const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const session = require("express-session");
// const pgSession = require("connect-pg-simple")(session);
// const bcrypt = require("bcrypt");

const app = express()
const port = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', __dirname + '/views');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const AdminRouter = require('./routes/admin')
const StudentRouter = require('./routes/student')
const StaffRouter = require('./routes/staff')
const ResultRouter = require('./routes/result')



//  const pool = new Pool({
//    user: "your_db_user",
//    host: "localhost",
//    database: "your_db_name",
//    password: "your_db_password",
//    port: 5432,
//  });


// app.use(
//   session({
//     store: new pgSession({
//       pool, // PostgreSQL connection pool
//     }),
//     secret: "your_session_secret", // Change this to a strong secret
//     resave: false,
//     saveUninitialized: false,
//   })
// );


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/admin", AdminRouter);
app.use("/student", StudentRouter);
app.use("/staff", StaffRouter);
app.use("/result", ResultRouter);


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})