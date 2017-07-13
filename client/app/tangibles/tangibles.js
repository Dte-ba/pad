const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './tangibles.routes';
import TangiblesDesignComponent from './tangibles-design/tangibles-design.component'

export default angular.module('padApp.tangibles', [uiRouter])
  .config(routes)
  .component('tangiblesDesign', {
    template: require('./tangibles-design/tangibles-design.html'),
    controller: TangiblesDesignComponent,
    controllerAs: 'vm'
  })
  .name;