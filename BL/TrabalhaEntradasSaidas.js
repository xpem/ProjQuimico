

//cria o json de saida
exports.ConstroiResposta = function(res, result){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(result))
  }

//   exports.ConstroiResposta = ConstroiResposta;