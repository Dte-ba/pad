'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
  	.state('main', {
	    url: '/',
	    template: '<main></main>'
	  })
	  .state('orientacion', {
        url: '/Orientacion',
        template: '<orientacion></orientacion>'
    })
    .state('transversales', {
        url: '/Transversales',
        template: '<transversales></transversales>'
    });
}
