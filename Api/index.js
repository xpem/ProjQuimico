const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');
var con = require('../Acesso/conexao');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

app.use('/', router);
var cors = require('cors');
app.use(cors());

app.listen(port, function () {
  console.log('server running')
});

router.get('/elementosws', (req, res) => {
  con.exeqSQLQuery("select id,nome,simbolo,numero,estado from elementoquimico",null, res);
})

router.post('/cadelementows',(req,res) =>{
  params = [req.body.nome,req.body.simbolo,req.body.numero,req.body.estado]
  con.exeqSQLQuery("insert into elementoquimico(nome,simbolo,numero,estado) values ('?','?',?,?);",params, res);
})