const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./dbchemical.sqlite3');

let consulta = function consulta(sqlQry, params, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  db.all(sqlQry, params, function (error, results) {
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
    db.run(sqlQry, params, function (error, results, fields) {
      if (error) {
        console.log(error);
        if (error.code == "ER_DUP_ENTRY") {
          resolve([1, "Erro: Dados já cadastrados!"]);
        }
        else
          resolve([1, "Erro ao tentar executar a tarefa."]);
      }
      else {
        resolve(["1"]);
      }
    })
  })
}

let insercao = async function (sqlQry, params) {
  return new Promise((resolve, reject) => {
    db.run(sqlQry, params, function (error, results, fields) {
      if (error) {
        console.log(error);
        if (error.code == "ER_DUP_ENTRY") {
          resolve([1, "Erro: Dados já cadastrados!"]);
        }
        else
          resolve([1, "Erro ao tentar executar a tarefa."]);
      }
      else {        
        // seleciona o id inserido.
   console.log(this.lastID)
   resolve(this.lastID);
      }
    })
  })
}


exports.consulta = consulta;
exports.comando = comando;
exports.insercao = insercao;

