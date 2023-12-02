const db = require("../database");

const scoresheetSchema = {
  scoresheet: {
    scoresheet_id: { type: "serial", primaryKey: true },
    student_id: {
      type: "string",
      foreignKey: { table: "students", mapping: "student_id" },
        },
    term: { type: "string", notNull: true },
    session: { type: "string", notNull: true }
    
    
  },
};