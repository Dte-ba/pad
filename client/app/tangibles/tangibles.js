'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tangibles', {
        url: '/tangibles',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('tangibles.design', {
        url: '/diseño/{area}/{eje}/{bloque}',
        templateUrl: 'app/tangibles/tangibles.html',
        controller: 'TangiblesCtrl'
      })
      .state('tangibles.buscar', {
        url: '/buscar/:content',
        templateUrl: 'app/tangibles/tangibles.html',
        controller: 'TangiblesCtrl'
      })
      /*.state('tangibles.ver', {
        url: '/ver/:uid',
        templateUrl: 'app/tangibles/tangible.html',
        controller: 'TangibleCtrl'
      })*/;
  });