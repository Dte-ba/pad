'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('design', {
      url: '/diseño/:area/:subarea?/:axis?eje',
      template: '<design></design>'
    });
}
