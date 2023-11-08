const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


const AdminRouter = require('./routes/admin')
const StudentRouter = require('./routes/student')
const StaffRouter = require('./routes/staff')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/admin", AdminRouter);
app.use("/student", StudentRouter);
app.use("/staff", StaffRouter);


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})