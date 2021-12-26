var mysql = require('mysql');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty@123',
    database: 'AlgoTrade'    
  });
  
dbConn.connect();

module.exports = dbConn;
