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
  'LocalStorageModule',
  'dc.angular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, seoServiceProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    localStorageServiceProvider.setPrefix('padApp');

    seoServiceProvider.config({
      title: 'PAD',
      description: 'El Programa de Alfabetización Digital es la propuesta pedagógica de la DTE para acompañar a los docentes en la enseñanza TIC, destinada a las escuelas primarias y CEC de la Provincia de Buenos Aires.',
      keyboards: ['pad', 'buenos aires', 'ba', 'educacion' , 'programa provincial', 'alfabetización digital', 'escritorio digital'],
      resetOnChange: true
    });
  })
  .run(function ($rootScope, $state, $stateParams, localStorageService, seoService) {
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