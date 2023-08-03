var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tulsi@2212",
  database: "feedback_app",
  port: 3306,
  multipleStatements: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

//TECHDET: Connect close logic is not yet iplemented

connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected...");
});

module.exports = connection;
