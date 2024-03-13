const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  database: "dbnode",
  user: "root",
  password: ""
});

db.connect(function(error) {
  if (error) throw error;
  console.log("Connected!");
});

module.exports = db;