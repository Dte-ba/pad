'use strict';

angular.module('padApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ngAnimate',
  'angular-loading-bar',
  'ngGridPanel',
  'infinite-scroll',
  'chart.js',
  'ngNumeraljs',
  'LocalStorageModule'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('padApp');
  })
  .run(function ($rootScope, $state, $stateParams, localStorageService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.showCartoon = false;
    $rootScope.repository = 'local';
    $rootScope.favoritos = [];
    $rootScope.favoritosSupported = localStorageService.isSupported;
    
    if (localStorageService.isSupported) {
      var fav = localStorageService.get('favoritos');
      
      if (fav === undefined || fav === null){
        localStorageService.set('favoritos', []);
      }

      $rootScope.favoritos = localStorageService.get('favoritos');
    }
    
    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.showCartoon = false;
      $rootScope.area = '';
    });
  });