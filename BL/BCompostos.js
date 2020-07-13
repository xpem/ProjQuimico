var con = require('../AL/conexao');
var trabvar = require('./TrabalhaEntradasSaidas')

exports.cad_composto = function (req, res) {
    if (req.body.Id > 0) {
        (con.comando("update compostoquimico set nome = ?,aparencia = ? where id = ?", [req.body.Composto, req.body.Aparencia, req.body.Id])).then(function (result) {
            trabvar.ConstroiResposta(res, result)
        });
    } else {
        (con.insercao("insert into compostoquimico(nome,aparencia) values(?,?);", [req.body.Composto, req.body.Aparencia])).then(function (result) {
            trabvar.ConstroiResposta(res, result)
        });
    }
}
exports.consulta_composto = function (req, res) {
    querie = "select id,nome,aparencia from compostoquimico"
    console.log(req.params.Id)     
    if (req.params.Id == 0) {
          
        con.consulta(querie, [], res);
    } else {
        con.consulta(querie + " where id = ?", req.params.Id, res);
    }
}

exports.del_composto = function(req, res) {      
    (con.comando("delete from formulaquimica where idcomposto = ?", req.params.Id)).then(function (result) {
      if (result => 0) {
        (con.comando("delete from compostoquimico where id = ?", req.params.Id)).then(function (result) {
            trabvar.ConstroiResposta(res, result)
        });
      }
    });
  }


  exports.consulta_formula = function(req, res)  {
    querie = "select eq.nome,eq.simbolo,fq.quantidade,fq.id,fq.idelemento from formulaquimica fq inner join elementoquimico eq on fq.idelemento = eq.id";
    if (req.params.Id == 0) {
      con.consulta(querie, null, res)
    } else {
      con.consulta(querie + " where fq.idcomposto = ?", req.params.Id, res)
    }
  }

 exports.cad_formulas = function (req, res){
    if (req.body.Id > 0) {
      (con.comando("update formulaquimica set idelemento = ?, quantidade = ?,idcomposto= ? where id = ?;", [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto, req.body.Id])).then(function (result) {
        trabvar.ConstroiResposta(res, result)
      });
    } else {
      (con.insercao("insert into formulaquimica(idelemento,quantidade,idcomposto) values(?,?,?);", [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto])).then(function (result) {
        trabvar.ConstroiResposta(res, result)
      });
    }
  }
  
  exports.del_formulas = function(req, res){
    (con.comando("delete from formulaquimica where id = ?", req.params.Id)).then(function (result) {
    trabvar.ConstroiResposta(res, result)
    });
  }