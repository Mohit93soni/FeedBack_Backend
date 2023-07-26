var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tulsi@2212',
  database: 'feedback_app',
  port: 3306,
  multipleStatements: true
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

module.exports =connection;