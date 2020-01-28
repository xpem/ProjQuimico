const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1', port: 3306, user: 'root', password: '123456', database: 'dbchemical'
});


let consulta = function consulta(sqlQry, params, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  connection.query(sqlQry, params, function (error, results, fields) {
    if (error)
      console.log(error);
    else {
      res.json(results);
    }
  });
}

let comando = function comando(sqlQry, params, ret) {
  connection.query(sqlQry, params, function (error, results, fields) {
    if (error)
      console.log(error);
    else {
      console.log(results.insertId)
      ret = results.insertId;
    }
  })
}

exports.consulta = consulta;
exports.comando = comando;