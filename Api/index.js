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
    con.consulta("select id,nome,simbolo,numero,estado,descricao from elementoquimico", null, res);
  }
  else {
    con.consulta("select id,nome,simbolo,numero,estado,descricao from elementoquimico where id = ?", req.params.Id, res);
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

  var resp;

  if (req.body.Id > 0) {
    params = [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao, req.body.Id]
    console.log(params)
    con.comando("update elementoquimico set nome = ?, simbolo = ?,numero= ?,estado = ?,descricao = ? where id = ?", params, resp);
  } else {
    params = [req.body.Nome, req.body.Simbolo, req.body.Numero, req.body.Estado, req.body.Descricao]
    con.comando("insert into elementoquimico(nome,simbolo,numero,estado,descricao) values (?,?,?,?,?);", params, resp);
  }

  console.log(resp);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.json(resp);

})

app.post('/cadcompostows', (req, res) => {
  var resp;
  if (req.body.Id > 0) {
    params = [req.body.Composto, req.body.Aparencia, req.body.Id]
    console.log(params)
    con.comando("update compostoquimico set nome = ?,aparencia = ? where id = ?", params, resp);
  } else {
    params = [req.body.Composto, req.body.Aparencia]
    con.comando("insert into compostoquimico(nome,aparencia) values(?,?);", params, resp);
  }

  console.log(resp);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.json(resp);

})

app.post('/cadformulaws', (req, res) => {
  var resp;
  if (req.body.Id > 0) {
    params = [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto, req.body.Id]
    console.log(params)
    con.comando("update formulaquimica set idelemento = ?, quantidade = ?,idcomposto= ? where id = ?;", params, resp);
  } else {
    params = [req.body.Idelemento, req.body.Quantidade, req.body.IdComposto]
    con.comando("insert into formulaquimica(idelemento,quantidade,idcomposto) values(?,?,?); ", params, resp);
  }

  console.log(resp);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.json(resp);

})

app.get('/delelementows/:Id', (req, res) => {
  console.log(req.params.Id)
  var resp
  con.comando("delete from elementoquimico where id = ?", req.params.Id, resp)
  console.log(resp);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.json(resp);
})

app.get('/delformulaws/:Id', (req, res) => {
  var resp;
  con.comando("delete from formulaquimica where id = ?", req.params.Id, resp)
  console.log(resp);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.json(resp);
})

app.get('/delcompostows/:Id', (req, res) => {
  var resp;
  con.comando("delete from formulaquimica where idcomposto = ?", req.params.Id, resp)
  con.comando("delete from compostoquimico where id = ?", req.params.Id, resp)

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  res.json(resp);
  console.log(resp);
})





