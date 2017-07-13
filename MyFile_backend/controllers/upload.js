var ObjectID = require('mongodb').ObjectID;
// var upload = require('arquivo.js');

var fs = require('fs');
  
module.exports = function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
	  var arquivo = req.files.file;
	  var temporario = req.files.file.path;
	  var nomeArquivo = req.files.file.name;
	  var novo = './uploads/' + nomeArquivo;
	  var extensao = req.files.file.type.split('/').pop();

	 	fs.rename(temporario, novo, function(err){
	 		if(err){
	 			res.status(500).json({error: err});
	 		}
	        req.db.collection('arquivos').save({"nome": nomeArquivo, "estensao": extensao, "tamanho": req.files.file.size}, function(err, result) {
            if (err) {
                 return res.sendStatus(503).json({error: err});
            }
            console.log(req.files)
        });
 	})
}