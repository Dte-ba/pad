'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('design', {
        url: '/diseño/:area/:axis?/:block?',
        templateUrl: 'app/design/design.html',
        controller: 'DesignCtrl'
      });
  });