const angular = require('angular');
const uiRouter = require('angular-ui-router');

import delayedModel from '../../components/delayedModel/delayedModel.directive';

import routes from './tangibles.routes';
import TangiblesDesignComponent from './tangibles-design.component'
import TangiblesSearchComponent from './tangibles-search.component'

export default angular.module('padApp.tangibles', [uiRouter, delayedModel])
  .config(routes)
  .component('tangiblesDesign', {
    template: require('./tangibles-design.html'),
    controller: TangiblesDesignComponent,
    controllerAs: 'vm'
  })
  .component('tangiblesSearch', {
    template: require('./tangibles-search.html'),
    controller: TangiblesSearchComponent,
    controllerAs: 'vm'
  })
  .name;