'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('contacto', {
      url: '/contacto',
      template: '<contacto></contacto>'
    });
}
