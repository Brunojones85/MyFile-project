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


// recupera um grupo utilizando o id (busca de grupos)
exports.recuperar = function (req, res) {
  req.db.collection('grupos').find({"nome": req.params.nome}).toArray(function(err, result) {
        if (err) {
          return console.log(err)
        };
        res.send(result);
  });
};
