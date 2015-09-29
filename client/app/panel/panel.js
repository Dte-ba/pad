'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('panel', {
        url: '/panel',
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('panel.stats', {
        url: '/stats',
        templateUrl: 'app/panel/stats/stats.html',
        controller: 'StatsCtrl'
      });
  });