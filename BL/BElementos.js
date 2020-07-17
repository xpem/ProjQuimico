
var con = require('../AL/conexao');
var trabvar = require('./TrabalhaEntradasSaidas')

exports.consulta_elemento = function (req, res) {
  querie = "select id,nome,simbolo,numero,estado,descricao from elementoquimico"
  if (req.params.Id == 0) {
    (con.consulta(querie + " order by numero", [])
    ).then(function (result) { trabvar.ConstroiResposta(res, result) })
  }
  else {
    (con.consulta(querie + " where id = ? order by numero", req.params.Id)
    ).then(function (result) { trabvar.ConstroiResposta(res, result) })
  }
}

exports.cad_elemento = function (req, res) {

  var querievalidacao = "select id from elementoquimico where "
  
  
  if (req.body.Id > 0) {
    (con.comando("update elementoquimico set nome = ?, simbolo = ?,numero= ?,estado = ?,descricao = ? where id = ?",
      [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao, req.body.Id])).then(function (result) {
        trabvar.ConstroiResposta(res, result)
      });
  } else {
    //verificar duplicidade de nome
    (con.consulta(querievalidacao + "nome = ?", [req.body.Nome])).then(function (result) {
      //
      console.log(result[0]);
      if (result[0] != undefined) {
        var retorno = [0, "Erro: Nome do elemento já cadastrado!"];
        trabvar.ConstroiResposta(res, retorno)
      }
      else {
        //verificar duplicidade de numero
        con.consulta(querievalidacao + "numero = ?", [req.body.Numero]).then(function (result) {
          //
          if (result[0] != undefined) {
            console.log(result);
            var retorno = [0, "Erro: Número atômico do elemento já cadastrados!"];
            trabvar.ConstroiResposta(res, retorno)
          }
          else {
            //verificar duplicidade de simbolo
            con.consulta(querievalidacao + "simbolo = ?", [req.body.Simbolo]).then(function (result) {
              if (result[0] != undefined) {
                console.log(result);
                var retorno = [0, "Erro: Simbolo do elemento já cadastrados!"];
                trabvar.ConstroiResposta(res, retorno)
              }
              else {
                (con.insercao("insert into elementoquimico(nome,simbolo,numero,estado,descricao) values (?,?,?,?,?);",
                  [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao])).then(function (result) {
                    trabvar.ConstroiResposta(res, result)
                  });
              }
            })
          }
        })
      }
    })
  }
}

exports.del_elemento = function (req, res) {
  (con.comando("delete from elementoquimico where id = ?", req.params.Id)).then(function (result) {
    trabvar.ConstroiResposta(res, result)
  });
}