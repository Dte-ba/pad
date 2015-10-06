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
  'ngNumeraljs'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.showCartoon = false;
    $rootScope.repository = 'local';

    $rootScope.$on('$stateChangeStart', function () {
      $rootScope.showCartoon = false;
      $rootScope.area = '';
    });
  });