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
  // var log = console.log.bind(console, 'result');
  req.db.collection('usuarios').findOne({email: dadosUsuario.email}



    , function(err, resultado) {
    if(resultado.email == dadosUsuario.email){
      return res.sendStatus(404);

    }else if(isEmpty(dadosUsuario.nome && dadosUsuario.email && dadosUsuario.senha &&
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
  });
}

//recuperar
exports.recuperar = function (req, res) {
  var dados = req.body;
    req.db.collection('usuarios').findOne(dados, function(err, result) {
      if (err) {
        return res.sendStatus(503);
      }
      res.send(result);
    });
}


// Login
exports.login = function (req, res) {
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
}

// recuperar usuario

exports.recuperar = function (req, res) {
  var id = req.params.id;

  req.db.collection('usuarios').findOne({_id: ObjectID(id)}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    if (!result) {
      return res.send(404);
    }
    //
    // req.db.collection('grupos').find({_id: { $in: result.grupos}}).toArray(function(errGrupos, resultGrupos) {
    //   if (errGrupos) {
    //     return res.sendStatus(503);
    //   }
    //   res.send({"Usuario": result, "Grupos": resultGrupos});
    // })
  });
};
