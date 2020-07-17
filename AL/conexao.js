const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./dbchemical.sqlite3');

exports.consulta  = function (sqlQry, params) {
  return new Promise((resolve) => {
  db.all(sqlQry, params, function (error, results) {
    if (error)
      console.log(error);
    else {
      resolve(results)
    }
  })
})
}

exports.comando = async function (sqlQry, params) {
  return new Promise((resolve) => {
    db.run(sqlQry, params, function (error) {
      if (error) {
        console.log(error);
        if (error.code == "ER_DUP_ENTRY") {
          resolve([1, "Erro: Dados já cadastrados!"]);
        }
        else
          resolve([1, "Erro ao tentar executar a tarefa."]);
      }
      else {
        resolve([0, "1"]);
      }
    })
  })
}

exports.insercao = async function (sqlQry, params) {
  return new Promise((resolve) => {
    db.run(sqlQry, params, function (error) {
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
   resolve([this.lastID]);
      }
    })
  })
}