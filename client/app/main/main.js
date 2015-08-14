'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('orientacion', {
        url: '/Orientacion',
        templateUrl: 'app/main/orientacion.html',
        controller: function(){

        }
      })
      .state('transversales', {
        url: '/Transversales',
        templateUrl: 'app/main/transversales.html',
        controller: 'TransversalesCtrl'
      });
  });