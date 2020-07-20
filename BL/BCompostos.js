var con = require('../AL/conexao');
var trabvar = require('./TrabalhaEntradasSaidas')

exports.cad_composto = function (req, res) {

  if (req.body.Id > 0) {
    (con.comando("update compostoquimico set nome = ?,aparencia = ? where id = ?", [req.body.Composto, req.body.Aparencia, req.body.Id])).then(function (result) {
      trabvar.ConstroiResposta(res, result)
    });
  } else {
    //verificar duplicidade
    con.consulta("select id from compostoquimico where nome = ?", req.body.Composto).then(function (result) {

      if (result[0] == undefined) {
        (con.insercao("insert into compostoquimico(nome,aparencia) values(?,?);", [req.body.Composto, req.body.Aparencia])).then(function (result) {
          trabvar.ConstroiResposta(res, result)
        });
      }
      else {
        console.log(result);
        var retorno = [0, "Erro: Composto já cadastrados!"];
        trabvar.ConstroiResposta(res, retorno)
      }
    })
  }
}

exports.consulta_composto = async function (req, res) {
  querie = "select id,nome,aparencia from compostoquimico"
  querieformula = "select eq.nome,eq.simbolo,fq.quantidade,fq.id,fq.idelemento from formulaquimica fq inner join elementoquimico eq on fq.idelemento = eq.id where fq.idcomposto = ?";

  var parametro = [];
  console.log(req.params)
  if (req.params.Id != undefined && req.params.Id != 0) {
    
    querie += " where id = ?"
    parametro = req.params.Id
  }
  else if (req.params.IdElemento != undefined && req.params.IdElemento != 0) {
    querie += " where id in (SELECT DISTINCT(idcomposto) FROM formulaquimica where idelemento = ?)"
    parametro = req.params.IdElemento
    console.log(querie)
    console.log(parametro)
  }

    (con.consulta(querie, parametro)).then(async function (result) {
      //construção da fórmula, para cada composto
      for (let i = 0; i < Object.keys(result).length; i++) {
        result[i].formula = "";
        await (con.consulta(querieformula, result[i].id)).then(function (result2) {
          for (let j = 0; j < Object.keys(result2).length; j++) {
            result[i].formula += result2[j].simbolo;
            if (result2[j].quantidade > 1) {
              result[i].formula += result2[j].quantidade;
            }
            console.log(result[i].formula)
          }
        })
      }
      console.log(result)
      trabvar.ConstroiResposta(res, result)
    })
}

exports.del_composto = function (req, res) {
  (con.comando("delete from formulaquimica where idcomposto = ?", req.params.Id)).then(function (result) {
    if (result => 0) {
      (con.comando("delete from compostoquimico where id = ?", req.params.Id)).then(function (result) {
        trabvar.ConstroiResposta(res, result)
      });
    }
  });
}

exports.consulta_formula  = function(req, res) {
  querie = "select eq.nome,eq.simbolo,fq.quantidade,fq.id,fq.idelemento from formulaquimica fq inner join elementoquimico eq on fq.idelemento = eq.id";
  if (req.params.Id == 0) {
    (con.consulta(querie, [])).then(function (result) {
      trabvar.ConstroiResposta(res, result)
    })
  } else {
    (con.consulta(querie + " where fq.idcomposto = ?", req.params.Id)
    ).then(function (result) {
      trabvar.ConstroiResposta(res, result)
    })
  }
}

exports.cad_formulas = function (req, res) {
  if (req.body.Id > 0) {
    //verificar se o id no elemento novo nao é duplicado, caso ele tenha sido mudado.
    (con.comando("update formulaquimica set idelemento = ?, quantidade = ?,idcomposto= ? where id = ?;", [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto, req.body.Id])).then(function (result) {
      trabvar.ConstroiResposta(res, result)
    });
  } else {
    (con.insercao("insert into formulaquimica(idelemento,quantidade,idcomposto) values(?,?,?);", [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto])).then(function (result) {
      trabvar.ConstroiResposta(res, result)
    });
  }
}

exports.del_formulas = function (req, res) {
  (con.comando("delete from formulaquimica where id = ?", req.params.Id)).then(function (result) {
    trabvar.ConstroiResposta(res, result)
  });
}
