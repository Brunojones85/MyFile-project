var express        = require('express'),
    bodyParser     = require('body-parser'),
    expressMongoDb = require('express-mongo-db'),
    multiparty     = require('connect-multiparty');

var grupoController   = require('./controllers/grupos.js'),
    usuarioController = require('./controllers/usuario.js'),
    arquivoController = require('./controllers/arquivo.js');


// inicializa o express
var app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/myfile'));

// libera acesso à API de qualquer host/cliente
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// inicializa o servidor na porta especificada
app.listen(3000,'0.0.0.0', function() {
  console.log('Acesse o servidor http://localhost:3000');
});
// Endpoints
app.get('/grupo',grupoController.listar);
app.post('/grupo', grupoController.criar);
app.post('/grupoUsuario', grupoController.recuperarGrupoUsuario);

app.get('/usuario', usuarioController.listar);
app.post('/usuario', usuarioController.criar);
app.post('/usuario/login', usuarioController.login);
app.get('/usuario/:id', usuarioController.recuperar);
// app.get('/usuario/grupo/:id', usuarioController.gruposRecuperar);

app.get('/arquivo', arquivoController.listar);
app.post('/arquivo', arquivoController.criar);
app.delete('/arquivo/:id', arquivoController.apagar);
app.get('/listarUm/:id', arquivoController.listarUm);

app.route('/galeria')
    .post(multiparty(), require('./controllers/upload.js'));

app.route('/arquivoFile')
    .post(multiparty(), require('./controllers/upload.js'));

// Endpoint busca arquivos (Bruno)
app.get('/arquivos/:nome', arquivoController.recuperar);

// Endpoint busca grupos (Bruno)
app.get('/grupos/:nome', grupoController.recuperar);

app.get('/contar', arquivoController.contar);
app.get('/contargrupo', grupoController.contargrupo);
