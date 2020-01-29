const express = require('express');
const app = express();

const port = 5000; //porta padrão
const mysql = require('mysql');
var con = require('../Acesso/conexao');

//configurando o body parser para pegar POSTS mais tarde
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());

app.listen(port, function () {
  console.log('server running')
});

app.get('/elementosws/:Id', (req, res) => {
  if (req.params.Id == 0) {
    con.consulta("select id,nome,simbolo,numero,estado,descricao from elementoquimico order by numero", null, res);
  }
  else {
    con.consulta("select id,nome,simbolo,numero,estado,descricao from elementoquimico where id = ? order by numero", req.params.Id, res);
  }
})

app.get('/formulaws/:Id', (req, res) => {
  querie = "select eq.nome,eq.simbolo,fq.quantidade,fq.id,fq.idelemento from formulaquimica fq inner join elementoquimico eq on fq.idelemento = eq.id";
  if (req.params.Id == 0) {
    con.consulta(querie, null, res)
  } else {
    con.consulta(querie + " where fq.idcomposto = ?", req.params.Id, res)
  }
})

app.get('/compostows/:Id', (req, res) => {
  querie = "select id,nome,aparencia from compostoquimico"
  if (req.params.Id == 0) {
    con.consulta(querie, null, res, true)
  } else {
    con.consulta(querie + " where id = ?", req.params.Id, res, true)
  }
})

app.post('/cadelementows', (req, res) => {
  if (req.body.Id > 0) {
    params = 
      (con.comando("update elementoquimico set nome = ?, simbolo = ?,numero= ?,estado = ?,descricao = ? where id = ?",
       [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao, req.body.Id])).then(function (result) {
        ConstroiResposta(res, result)
      });
  } else {
    
      (con.comando("insert into elementoquimico(nome,simbolo,numero,estado,descricao) values (?,?,?,?,?);", 
      [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao])).then(function (result) {
        ConstroiResposta(res, result)
      });
  }
})

app.post('/cadcompostows', (req, res) => {
 console.log(req.body)
  if (req.body.Id > 0) {
      (con.comando("update compostoquimico set nome = ?,aparencia = ? where id = ?", [req.body.Composto, req.body.Aparencia, req.body.Id])).then(function (result) {
        ConstroiResposta(res, result)
        console.log(result)
      });
  } else {
    (con.comando("insert into compostoquimico(nome,aparencia) values(?,?);", [req.body.Composto, req.body.Aparencia])).then(function (result) {
      ConstroiResposta(res, result)
    });
  }
})

app.post('/cadformulaws', (req, res) => {
  if (req.body.Id > 0) {
      (con.comando("update formulaquimica set idelemento = ?, quantidade = ?,idcomposto= ? where id = ?;", [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto, req.body.Id])).then(function (result) {
        ConstroiResposta(res, result)
      });
  } else {
      (con.comando("insert into formulaquimica(idelemento,quantidade,idcomposto) values(?,?,?);", [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto])).then(function (result) {
        ConstroiResposta(res, result)
      });
  }
})

app.get('/delelementows/:Id', (req, res) => {
  (con.comando("delete from elementoquimico where id = ?", req.params.Id)).then(function (result) {
    ConstroiResposta(res, result)
  });
})

app.get('/delformulaws/:Id', (req, res) => {
  (con.comando("delete from formulaquimica where id = ?", req.params.Id)).then(function (result) {
    ConstroiResposta(res, result)
  });
})

app.get('/delcompostows/:Id', (req, res) => {
  (con.comando("delete from formulaquimica where idcomposto = ?", req.params.Id)).then(function (result) {
    if (result => 0) {
      (con.comando("delete from compostoquimico where id = ?", req.params.Id)).then(function (result) {
        ConstroiResposta(res, result)
      });
    }
  });
})

function ConstroiResposta(res, result) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(result))
}





