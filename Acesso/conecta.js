//teste de conexão
var conexao = require('./conexao')

conexao.connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('conectou!');
})