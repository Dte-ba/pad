'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?mode&ip&port',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('orientacion', {
        url: '/Orientacion',
        templateUrl: 'app/main/orientacion.html',
        controller: function($scope, $http){
          $http
            .get('/api/info')
            .success(function(info){
              $scope.version = info.version;
              $scope.kernel = info.kernel;
              $scope.repository = info.repository;
              $scope.isDesktop = info.mode === 'desktop';
            });
        }
      })
      .state('transversales', {
        url: '/Transversales',
        templateUrl: 'app/main/transversales.html',
        controller: 'TransversalesCtrl'
      });
  });