angular.module('starter.services', [])

.factory('Sessao', function() {

  var usuario;

  return {
    inicializar: function(dados) {
      usuario = dados;
    },
    usuario: function(id) {
      return usuario;
    }
}

})
