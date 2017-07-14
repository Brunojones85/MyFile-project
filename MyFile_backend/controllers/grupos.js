var ObjectID = require('mongodb').ObjectID;

//lista os grupos
exports.listar = function (req, res) {
    req.db.collection('grupos').find().toArray(function(err, result) {
        if (err) {
            return console.log(err)
        };

        res.send(result);
    });
};

//cria grupo
exports.criar = function (req, res){
	var dadosGrupos = req.body;

	        req.db.collection('grupos').save(dadosGrupos, function(err, result) {
            if (err) {
                return res.sendStatus(503);
            }
            res.sendStatus(201);
        });
}

exports.apagar = function (req, res) {
  var id = req.params.id;

  req.db.collection('grupos').remove({_id: ObjectID(id)}, {justOne: true}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.sendStatus(200);
  });
};

//recuperar os grupos
exports.recuperar = function (req, res) {
  var id = req.params.id;

  req.db.collection('grupos').findOne({_id: ObjectID(id)}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    if (!result) {
      return res.send(404);
    }

      res.send(result);
  });
};


// recupera um grupo utilizando o id (busca de grupos)
exports.recuperar = function (req, res) {
  req.db.collection('grupos').find({"nome": req.params.nome}).toArray(function(err, result) {
        if (err) {
          return console.log(err)
        };
        res.send(result);
  });
};

//conta grupos
exports.contargrupo = function (req, res) {
  req.db.collection('grupos').count({}, function(err, result){
    if (err) {
      res.sendStatus(503);
    }

    res.send({contagem: result});
  });
}

exports.recuperarGrupoUsuario = function(req, res) {
  var grupos = req.body

  for(var i in grupos){
    grupos[i] = ObjectID(grupos[i])
  }

  console.log(req.body);
  req.db.collection('grupos').find({_id: { $in: grupos}}).toArray(function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    console.log(result);
    res.send(result);
  })
}
