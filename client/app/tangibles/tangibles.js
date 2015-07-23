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
        url: '/buscar?texto?',
        templateUrl: 'app/tangibles/tangibles.search.html',
        controller: 'SearchTangiblesCtrl'
      })
      .state('tangibles.tag', {
        url: '/tag/:tag',
        templateUrl: 'app/tangibles/tangibles.tag.html',
        controller: 'TagTangiblesCtrl'
      })
      .state('tangibles.ver', {
        url: '/ver/:uid',
        templateUrl: 'app/tangibles/tangible.html',
        controller: 'TangibleCtrl'
      });
  });