
var con = require('../AL/conexao');

let consulta_elemento = function consulta_elemento(req, res) {
  if (req.params.Id == 0) {
    con.consulta("select id,nome,simbolo,numero,estado,descricao from elementoquimico order by numero", [], res);
  }
  else {
    con.consulta("select id,nome,simbolo,numero,estado,descricao from elementoquimico where id = ? order by numero", req.params.Id, res);
  }
}

exports.consulta_elemento = consulta_elemento;