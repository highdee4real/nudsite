const db = require("../database");

const sessionSchema = {
    session: {
        sid: { type: "string", primaryKey: true, notNull: true },
        sess: { type: "json", notNull: true },
        expire: { type: "timestamp", notNull: true}
    }
}

db.none(
  `CREATE TABLE session (
    sid VARCHAR NOT NULL PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMPTZ NOT NULL
);
`
)
  .then(() => {
    console.log("Session table has been created successfully");
  })
  .catch((error) => {
    console.error("Error creating session table:", error);
  });

db;
module.exports = { db, sessionSchema };