var ObjectID = require('mongodb').ObjectID,
    isEmpty  = require('is-empty'),
    IsEmail = require('isemail');

//lista os usuarios
exports.listar = function (req, res) {
  req.db.collection('usuarios').find().toArray(function(err, result) {
    if (err) {
      return console.log(err)
    };

    res.send(result);
  });
};

//cria usuario
exports.criar = function (req, res){
  var dadosUsuario = req.body;
  var log = console.log.bind(console, 'result');

  if(isEmpty(dadosUsuario.nome && dadosUsuario.email && dadosUsuario.senha &&
    dadosUsuario.escolha)){
    return res.sendStatus(403);

  }else if(dadosUsuario.senha.length < 8){
    return res.sendStatus(402);

  }else if(!IsEmail.validate(dadosUsuario.email)){
    return res.sendStatus(401);

  }else if(dadosUsuario.nome.length < 4){
    return res.sendStatus(400);

  }else{
  req.db.collection('usuarios').save(dadosUsuario, function(err, result) {
      if (err) {
        return res.sendStatus(503);
      }

      res.sendStatus(201);
    });
  }
}


// Login
exports.recuperar = function (req, res) {
  var dados = req.body;

    if(isEmpty(dados.email && dados.senha)){
      return res.sendStatus(403)
    }else{

    req.db.collection('usuarios').findOne(dados, function(err, result) {
      if (err) {
        return res.sendStatus(503);
      }

      if (!result) {
        return res.sendStatus(400);
      }

      res.send(result);
    });
  }
};
