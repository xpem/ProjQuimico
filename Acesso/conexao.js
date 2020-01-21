const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1', port: 3306, user: 'root', password: '123456', database: 'dbchemical'
});

let exeqSQLQuery = function exeqSQLQuery(sqlQry, params, res, consulta) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
    connection.query(sqlQry, params, function (error, results, fields) {
    if (error)
      console.log(error);
    else {
      if (consulta == true) {
        res.json(results);
      }
      else {
        console.log(results.insertId)
        res.json(results.insertId);
      }
    }
    // connection.end();
  });
}

exports.exeqSQLQuery = exeqSQLQuery;