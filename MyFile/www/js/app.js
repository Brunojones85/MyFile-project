// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

    .state('cadastro', {
      url: '/cadastro',
      templateUrl: 'templates/cadastro.html',
      controller: 'CadastroController'
    })

        .state('upload', {
      url: '/upload',
      templateUrl: 'templates/upload.html',
      controller: 'UploadController'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppController'
    })

    .state('app.grupos', {
      url: '/grupos',
      views: {
        'menuContent': {
          templateUrl: 'templates/grupos.html',
          controller:  'GruposController'
        }
      }
    })

    .state('app.arquivos', {
      url: '/arquivos/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/arquivos.html',
          controller:  'ArquivosController'
        }
      }
    })

    .state('app.grupoMais', {
        url: '/grupoMais',
        views: {
          'menuContent': {
            templateUrl: 'templates/grupoMais.html',
            controller:  'GrupoMaisController'
          }
        }
      })
      .state('app.galeria', {
        url: '/galeria',
        views: {
          'menuContent': {
            templateUrl: 'templates/galeria.html',
            controller: 'GaleriaController'
          }
        }
      })

      .state('app.detalhe-arquivo', {
        url: '/detalhe-arquivo/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/detalhe-arquivo.html',
            controller: 'DetalheArquivoController'
          }
        }
      })

      .state('app.perfil', {
        url: '/perfil',
        views: {
          'menuContent': {
            templateUrl: 'templates/perfil.html',
            controller: 'PerfilController'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });





