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

app.get('/elementosws', (req, res) => {
  con.exeqSQLQuery("select id,nome,simbolo,numero,estado from elementoquimico",null, res);
})

app.post('/cadelementows',(req,res) =>{
  params = [req.body.Nome,req.body.Simbolo,req.body.Numero,req.body.Estado]
  console.log(params)
  con.exeqSQLQuery("insert into elementoquimico(nome,simbolo,numero,estado) values (?,?,?,?);",params, res);
})