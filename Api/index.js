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
    con.exeqSQLQuery("select id,nome,simbolo,numero,estado,descricao from elementoquimico", null, res, true);
  }
  else {
    con.exeqSQLQuery("select id,nome,simbolo,numero,estado,descricao from elementoquimico where id = ?", req.params.Id, res, true);
  }
})

app.get('/formulaws/:Id', (req, res) => {
  if (req.params.Id == 0) {
    con.exeqSQLQuery("select eq.nome,eq.simbolo,fq.quantidade,fq.id,fq.idelemento from formulaquimica fq inner join elementoquimico eq on fq.idelemento = eq.id", null, res, true)
  } else {
    con.exeqSQLQuery("select eq.nome,eq.simbolo,fq.quantidade,fq.id,fq.idelemento from formulaquimica fq inner join elementoquimico eq on fq.idelemento = eq.id where fq.idcomposto = ?", req.params.Id, res, true)
  }
})

app.get('/compostows/:Id', (req, res) => {
  if (req.params.Id == 0) {
    con.exeqSQLQuery("select id,nome,aparencia from compostoquimico", null, res, true)
  } else {
    con.exeqSQLQuery("select id,nome,aparencia from compostoquimico where id = ?", req.params.Id, res, true)
  }
})

app.post('/cadelementows', (req, res) => {
  if (req.body.Id > 0) {
    params = [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao, req.body.Id]
    console.log(params)
    con.exeqSQLQuery("update elementoquimico set nome = ?, simbolo = ?,numero= ?,estado = ?,descricao = ? where id = ?", params, res, false);
  } else {
    params = [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao]
    con.exeqSQLQuery("insert into elementoquimico(nome,simbolo,numero,estado,descricao) values (?,?,?,?,?);", params, res, false);
  }
})

app.post('/cadcompostows', (req, res) => {
  if (req.body.Id > 0) {
    params = [req.body.Composto, req.body.Aparencia, req.body.Id]
    console.log(params)
    con.exeqSQLQuery("update compostoquimico set nome = ?,aparencia = ? where id = ?", params, res, false);
  } else {
    params = [req.body.Composto, req.body.Aparencia]
    con.exeqSQLQuery("insert into compostoquimico(nome,aparencia) values(?,?);", params, res, false);
  }
})

app.post('/cadformulaws', (req, res) => {
  if (req.body.Id > 0) {
    params = [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto, req.body.Id]
    console.log(params)
    con.exeqSQLQuery("update formulaquimica set idelemento = ?, quantidade = ?,idcomposto= ? where id = ?;", params, res, false);
  } else {
    params = [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto]
    con.exeqSQLQuery("insert into formulaquimica(idelemento,quantidade,idcomposto) values(?,?,?); ", params, res, false);
  }
})

app.get('/delelementows/:Id', (req, res) => {
  console.log(req.params.Id)
  con.exeqSQLQuery("delete from elementoquimico where id = ?", req.params.Id, res, false)
})


app.get('/delformulaws/:Id', (req, res) => {
  con.exeqSQLQuery("delete from formulaquimica where id = ?", req.params.Id, res, false)
})





