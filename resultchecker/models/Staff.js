const db = require("../database");


const StaffSchema = {
  staff: {
    staff_id: { type: "string", primaryKey: true },
    title: { type: "string", notNull: true },
    name: { type: "string", notNull: true },
    email: { type: "string", notNull: true },
    phonenumber: { type: "bigint", notNull: true },
    grades: { type: "string", notNull: true },
    department: { type: "string", notNull: true },
    password: { type: "string", notNull: true }
  },
};

db.none(
    `CREATE TABLE IF NOT EXISTS staff (
        staff_id VARCHAR(25) PRIMARY KEY,
        title VARCHAR(15) NOT NULL,
        name VARCHAR(25) NOT NULL,
        email VARCHAR(25) NOT NULL,
        phonenumber BIGINT NOT NULL,
        grades VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL,
        password VARCHAR(25) NOT NULL
    )`
).then(() => {
    console.log("Staff table has been created successfully")
}).catch((error) => {
    console.error("Error creating Staff Table:", error); 
});

module.exports = { db, StaffSchema };