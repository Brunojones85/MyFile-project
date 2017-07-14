angular.module('starter.controllers', [])

.controller('LoginController', function($scope, $state, $http, Sessao) {
  $scope.dados = {};

  $scope.login = function () {
    $http.post('http://localhost:3000/usuario/login', $scope.dados).then(function(resposta) {
      Sessao.inicializar(resposta.data);
      console.log(resposta.data);
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

      if(resposta.status == 404){
        return $scope.erro = "Usuário já cadastrado";
      }
    });
  }
})

.controller('AppController', function($scope, $ionicModal, $timeout) {

})

.controller('GruposController', function($scope, $http, Sessao) {
  var usuario = Sessao.usuario();

  $http.post('http://localhost:3000/grupoUsuario', usuario.grupos).then(function(reposta){
    $scope.grupos = reposta.data;
    console.log(reposta.data)
  });
})

.controller('UploadController', function($scope, $http) {

  })

.controller('ArquivosController', function($scope, $http, $ionicActionSheet) {
    $http.get('http://localhost:3000/arquivo').then(function(reposta){
    $scope.arquivos = reposta.data;
    // console.log(reposta.data);
     });

          $scope.enviar = function(){
      var formData = new FormData();
      var arquivo = document.getElementById("arquivoInput").files[0];
      formData.append("file", arquivo);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        // if (xhr.readyState == 4) {
        //   var span = document.getElementById('mensagem');
        //   var resposta = xhr.responseText;
        //   span.innerHTML += resposta;
        //   }
         }
        xhr.open("POST", "http://localhost:3000/arquivoFile");
        xhr.send(formData);
      }

      $scope.showActionsheet = function() {
    console.log(1);
    $ionicActionSheet.show({
        buttons: [
        { text: '<i class="icon ion-share"></i> Compartilhar' },
        { text: '<i class="icon ion-star"></i> Favoritos' },
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };




})

.controller('DetalheArquivoController', function($scope, $stateParams, $http) {
    $http.get('http://localhost:3000/listarUm/' + $stateParams.id).then(function(reposta){
    $scope.arquivo = reposta.data;
  })
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

// .controller('GrupoMaisController', function($scope) {


// })

.controller('GaleriaController', function($scope, $http) {

      $scope.enviar = function(){
      var formData = new FormData();
      var arquivo = document.getElementById("arquivoInput").files[0];
      formData.append("file", arquivo);
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        // if (xhr.readyState == 4) {
        //   var span = document.getElementById('mensagem');
        //   var resposta = xhr.responseText;
        //   span.innerHTML += resposta;
        //   }
         }
        xhr.open("POST", "http://localhost:3000/galeria");
        xhr.send(formData);
      }

})
