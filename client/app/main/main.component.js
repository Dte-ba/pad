import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

import OrientacionesComponent from './orientaciones.component';
import TransversalesComponent from './transversales.component';

export class MainController {

  /*@ngInject*/
  constructor($http, $rootScope) {
    this.$http = $http;
  }

  $onInit() {
    //this.$http.get('/api/things')
    //  .then(response => {
    //    this.awesomeThings = response.data;
    //  });
  }
}

export default angular.module('padApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'vm'
  })
  .component('orientacion', {
    template: require('./orientacion.html'),
    controller: OrientacionesComponent,
    controllerAs: 'vm'
  })
  .component('transversales', {
    template: require('./transversales.html'),
    controller: TransversalesComponent,
    controllerAs: 'vm'
  })
  .name;
