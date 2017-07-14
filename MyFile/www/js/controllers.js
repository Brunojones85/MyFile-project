angular.module('starter.controllers', [])

.controller('LoginController', function($scope, $state, $http) {
  $scope.dados = {};

  $scope.login = function () {
    $http.post('http://localhost:3000/usuario/login', $scope.dados).then(function(resposta) {
      $scope.usuario = resposta.data;
      $state.go('app.grupos');

    }, function(resposta){
      if(resposta.status == 400){
        return $scope.erro = "E-mail ou Senha incorreto";
      }

      if(resposta.status == 403){
        return $scope.erro = "Dados em branco";
      }

      if(reposta.status == 503){
        return $scope.erro = "Tente novamente mais tarde";
      }
    });
  }

  $scope.cadastro = function () {
    $state.go('cadastro')
  }

})

.controller('CadastroController', function($scope, $state, $http) {
    $scope.dados = {};

    $scope.salvar = function () {
      $http.post('http://localhost:3000/usuario', $scope.dados).then(function(reposta){

      // if(resposta.status == 201){
        $scope.usuarios = reposta.data;
        $state.go('app.grupos')
      // }
    },function(resposta){
      if(resposta.status == 403){
          return $scope.erro = "Dados em branco";
      }

      if(resposta.status == 503){
        return $scope.erro = "Tente novamente mais tarde";
      }

      if(resposta.status == 402){
        return $scope.erro = "Senha muito curta, tente pelo o menos com 8 digito";
      }

      if(resposta.status == 401){
        return $scope.erro = "E-mail inválidos";
      }

      if(resposta.status == 400){
        return $scope.erro = "Nome muito curto";
      }
    });
  }
})

.controller('AppController', function($scope, $ionicModal, $timeout) {

})

.controller('GruposController', function($scope, $http) {
  $http.get('http://localhost:3000/grupo').then(function(reposta){
    $scope.grupos = reposta.data;
  });
})

.controller('UploadController', function($scope, $http) {

    $scope.enviar = function(){
      var formData = new FormData();
      var arquivo = document.getElementById("arquivoInput").files[0];
      formData.append("file", arquivo);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var div = document.getElementById('mensagem');
          var resposta = xhr.responseText;
          div.innerHTML += resposta;
          }
        }
        xhr.open("POST", "http://localhost:3000/upload");
        xhr.send(formData);
      }
  })

.controller('ArquivosController', function($scope, $http) {
    $http.get('http://localhost:3000/arquivo').then(function(reposta){
    $scope.arquivos = reposta.data;
     });
})

.controller('DetalheArquivoController', function($scope, $stateParams, ServiceArquivos) {
    $scope.arquivo = ServiceArquivos.get($stateParams.id);
})

.controller('PerfilController', function($scope, $http, $ionicPopup) {
   $http.get('http://localhost:3000/contar').then(function(reposta){
   $scope.countArquivos = reposta.data.contagem;
   });

   $http.get('http://localhost:3000/contargrupo').then(function(reposta){
   $scope.countGrupos = reposta.data.contagem;
  });

       $scope.showPopup = function() {
      $scope.data = {}
       var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Crie seu grupo!',
         scope: $scope,
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Criar</b>',
               type: 'button-positive',
                  onTap: function(e) {
                     if (!$scope.data.model) {
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });
      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });
   };

     $scope.showPopupTwo = function() {
      $scope.data = {}
       var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Digite o nome do grupo',
         scope: $scope,
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Buscar</b>',
               type: 'button-positive',
                  onTap: function(e) {
                     if (!$scope.data.model) {
                           e.preventDefault();
                     } else {
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });
      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });
   };

})

.controller('GaleriaController', function($scope) {
  $scope.galerias = [
    {
      nome:''
    }
  ];
});
