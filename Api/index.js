const express = require('express');
const app = express();
const port = 5000; //porta padrão


var con = require('../AL/conexao');
var belemento = require('../BL/BElementos');

//configurando o body parser para pegar POSTS mais tarde
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

app.listen(port, function () {
  console.log('server running')
});


//serviços para os elementos

app.get('/elementosws/:Id', (req, res) => {
  require('../BL/BElementos').consulta_elemento(req, res);
})

app.post('/cadelementows', (req, res) => {
  belemento.cad_elemento(req, res)
})

app.get('/delelementows/:Id', (req, res) => {
  belemento.del_elemento(req, res)
})
//--

//serviços para compostos e suas fórmulas

app.get('/compostows/:Id', (req, res) => {
  require('../BL/BCompostos').consulta_composto(req,res);
})

app.post('/cadcompostows', (req, res) => {
  require('../BL/BCompostos').cad_composto(req,res);
})

app.get('/delcompostows/:Id', (req, res) => {  
  require('../BL/BCompostos').del_composto(req,res);
})

app.get('/formulaws/:Id', (req, res) => {
  require('../BL/BCompostos').consulta_formula(req,res);
})

app.post('/cadformulaws', (req, res) => {
  require('../BL/BCompostos').cad_formulas(req,res);
})

app.get('/delformulaws/:Id', (req, res) => {

  require('../BL/BCompostos').del_formulas(req,res);
})

//--









