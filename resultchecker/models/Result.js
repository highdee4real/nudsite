const db = require("../database");

const resultSchema = {
    results: {
      result_id: { type: "string", primaryKey: true },
      student_id: {
      type: "string",
      foreignKey: { table: "students", mapping: "student_id" },
      },
      grade: { type: "string", notNull: true },
      term: { type: "string", notNull: true },
      session: { type: "string", notNull: true },
      subject: { type: "string", notNull: true },
      score: { type: "integer", notNull: true },
      remark: { type: "string", notNull: true }
  },
};

db.none(
  `
CREATE TABLE IF NOT EXISTS results (
    result_id SERIAL PRIMARY KEY,
    student_id VARCHAR(25) REFERENCES students(student_id) NOT NULL,
    grade VARCHAR(25) NOT NULL,
    term VARCHAR NOT NULL,
    session VARCHAR(25) NOT NULL,
    subject VARCHAR(25) NOT NULL,
    score INTEGER NOT NULL,
    remark VARCHAR(25) NOT NULL
)
`
)
  .then(() => {
    console.log("Result table has been created successfully");
  })
  .catch((error) => {
    console.error("Error creating result table:", error);
  });

module.exports = { db, resultSchema };