
var con = require('../AL/conexao');
var trabvar = require('./TrabalhaEntradasSaidas')

exports.consulta_elemento = function (req, res) {
  querie = "select id,nome,simbolo,numero,estado,descricao from elementoquimico"
  if (req.params.Id == 0) {
    con.consulta(querie + " order by numero", [], res);
  }
  else {
    con.consulta(querie + " where id = ? order by numero", req.params.Id, res);
  }
}

exports.cad_elemento = function (req, res) {
  if (req.body.Id > 0) {
      (con.comando("update elementoquimico set nome = ?, simbolo = ?,numero= ?,estado = ?,descricao = ? where id = ?",
        [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao, req.body.Id]))
        .then(function (result) {
          trabvar.ConstroiResposta(res, result)});
  } else {
    (con.insercao("insert into elementoquimico(nome,simbolo,numero,estado,descricao) values (?,?,?,?,?);",
      [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao]))
      .then(function (result) {
        trabvar.ConstroiResposta(res, result)
      });
  }
}

exports.del_elemento  = function(req, res) {
  (con.comando("delete from elementoquimico where id = ?", req.params.Id)).then(function (result) {
    trabvar.ConstroiResposta(res, result)});
}