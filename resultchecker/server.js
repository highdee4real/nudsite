const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");


const app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nudapp",
  password: "admin",
  port: 5432,
});

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', __dirname + '/views');

app.use(
  session({
    secret: "nurudeengrammarschool", // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool, // PostgreSQL connection pool
    }),
  })
);

const { isStudentAuth, isStaffAuth } = require("./middleware/Auth")

const AdminRouter = require("./routes/admin");
const StudentRouter = require("./routes/student");
const StaffRouter = require("./routes/staff");
const ResultRouter = require("./routes/result");

//app.use(isStudentAuth);
app.use("/admin", AdminRouter);
app.use("/student",  StudentRouter);
app.use("/staff",  StaffRouter);
app.use("/result", isStudentAuth, ResultRouter);

// Your route handling logic goes here
// app.get('/res_proc.html', isStaffAuth, function (req, res) {
//   console.log("url is visited")
//   res.sendFile(__dirname + '.../public/res_proc.html');
// });

app.get("/logout", function (req, res) {
  req.session.userID = "";
  res.redirect("/index.html");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.render('404');
});

app.listen(port, function () {
  console.log(`App running on  http://localhost:${port}`)
})