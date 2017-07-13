'use strict';

export class BienvenidoCtrl {
	/*@ngInject*/
	constructor(){
		this.menuItems = [
        {
          state: 'bienvenido.presentacion',
          title: 'Presentación'
        },
        {
          state: 'bienvenido.acercade',
          title: 'Acerca del PAD'
        },
        /*{
          state: 'bienvenido.marco',
          title: 'Marco General'
        },
        {
          state: 'bienvenido.encuadres',
          title: 'Encuadre de la Areas y CEC'
        }*/
      ];
	}
}

export class AcercaDeCtrl {
  /*@ngInject*/
  constructor($http){
    this.$http = $http;
  }

  $onInit(){
    this.$http
      .get('/api/info')
      .then((response) => {
        let info = response.data;
        this.version = info.version;
        this.kernel = info.kernel;
      });
  }
}

export class EncuadresCtrl {
  /*@ngInject*/
  constructor($http){
    this.$http = $http;
  }

  $onInit(){
    this.$http
      .get('/api/design/encuadres')
      .then((response) => {
        this.encuadres = response.data;
      });
  }
}

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('bienvenido', {
      url: '/bienvenido',
      abstract: true,
      template: require('./bienvenido.html'),
      controller: BienvenidoCtrl,
      controllerAs: 'vm'
    })
    .state('bienvenido.presentacion', {
      url: '/Presentacion',
      views: {
        'content': {
          template: require('./presentacion.html')
        }
      }
    })
    .state('bienvenido.acercade', {
      url: '/Acerca',
      views: {
        content: {
          template: require('./acercade.html'),
          controller: AcercaDeCtrl,
          controllerAs: 'vm'
        }
      }
    })
    .state('bienvenido.encuadres', {
        url: '/Encuadres',
        views: {
          'content': {
            template: require('./encuadres.html'),
            controller: EncuadresCtrl,
            controllerAs: 'vm'
          }
        }
      })
    ;
}
