'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bienvenido', {
        url: '/bienvenido',
        abstract: true,
        templateUrl: 'app/bienvenido/bienvenido.html',
        controller: function($scope) {
          $scope.menuItems = [
            {
              state: 'bienvenido.presentacion',
              title: 'Presentación'
            },
            {
              state: 'bienvenido.acercade',
              title: 'Acerca del PAD'
            },
            /*{
              state: 'bienvenido.marco',
              title: 'Marco General'
            },*/
            {
              state: 'bienvenido.encuadres',
              title: 'Encuadre de la Areas y CEC'
            }
          ];
        }
      })
      .state('bienvenido.presentacion', {
        url: '/Presentacion',
        views: {
          'content': {
            templateUrl: 'app/bienvenido/presentacion.html',
            controller: function($scope, $window) {
            }
          }
        }
      })
      .state('bienvenido.acercade', {
        url: '/Acerca',
        views: {
          content: {
            templateUrl: 'app/bienvenido/acercade.html',
            controller: function($scope, $http) {
              $http
                .get('/api/info')
                .success(function(info){
                  $scope.version = info.version;
                  $scope.kernel = info.kernel;
                });
            }
          }
        }
      })
      .state('bienvenido.encuadres', {
        url: '/Encuadres',
        views: {
          'content': {
            templateUrl: 'app/bienvenido/encuadres.html',
            controller: function($scope, $window, $http) {
              $http
                .get('/api/design/encuadres')
                .success(function(data){
                  $scope.encuadres = data;
                });
            }
          }
        }
      })
      ;
  });