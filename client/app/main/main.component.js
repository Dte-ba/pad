import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $rootScope) {
    this.$http = $http;
    console.log($rootScope);
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
    controller: MainController
  })
  .name;
