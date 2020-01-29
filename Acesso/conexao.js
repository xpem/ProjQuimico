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
      console.log(results)
      res.json(results);
    }
  });
}

let comando = async function (sqlQry, params) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQry, params, function (error, results, fields) {
      if (error) {
        console.log(error);
        if (error.code == "ER_DUP_ENTRY") {
          resolve([1, "Erro: Dados já cadastrados!"]);
        }
        else
          resolve([1,"Erro ao tentar executar a tarefa."]);
      }
      else {
        resolve([0,results.insertId]);
      }
    })
  })
}

exports.consulta = consulta;
exports.comando = comando;