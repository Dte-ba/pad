'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('design', {
        url: '/diseño/:area/:axis?',
        templateUrl: 'app/design/design.html',
        controller: 'DesignCtrl'
      });
  });