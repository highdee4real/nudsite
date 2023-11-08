const db = require("../database");

const studentSchema = {
  students: {
    student_id: { type: "string", primaryKey: true },
    surname: { type: "string", notNull: true },
    othername: { type: "string", notNull: true },
    gender: { type: "string", notNull: true },
    grade: { type: "string", notNull: true },
    department: { type: "string", notNull: true},
    password: { type: "string", notNull: true },
  },
};

db.none(
  `
CREATE TABLE IF NOT EXISTS students (
    student_id VARCHAR(25) PRIMARY KEY,
    surname VARCHAR(25) NOT NULL,
    othername VARCHAR(25) NOT NULL,
    gender VARCHAR(5) NOT NULL,
    grade VARCHAR(25) NOT NULL,
    department VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL
)
`
)
  .then(() => {
    console.log("Student table has been created successfully");
  })
  .catch((error) => {
    console.error("Error creating student table:", error);
  });

module.exports = { db, studentSchema };

