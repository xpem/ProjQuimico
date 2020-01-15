const mysql = require('mysql')

let exeqSQLQuery = function exeqSQLQuery(sqlQry, params, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');

  connection = mysql.createConnection({
    host: '127.0.0.1', port: 3306, user: 'root', password: '123456', database: 'dbchemical'
  });

  connection.query(sqlQry, params, function (error, results, fields) {
    if (error)
      console.log(error);
    else
    res.json(results);
    connection.end();
  });
}

exports.exeqSQLQuery = exeqSQLQuery;