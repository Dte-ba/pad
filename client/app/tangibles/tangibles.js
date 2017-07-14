const angular = require('angular');
const uiRouter = require('angular-ui-router');

import delayedModel from '../../components/delayedModel/delayedModel.directive';

import routes from './tangibles.routes';
import TangiblesDesignComponent from './tangibles-design.component'
import TangiblesSearchComponent from './tangibles-search.component'
import TangiblesTagComponent from './tangibles-tag.component'
import TangiblesFavoritosComponent from './tangibles-favoritos.component'
import TangiblesVerComponent from './tangibles-ver.component'

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
  .component('tangiblesTag', {
    template: require('./tangibles-tag.html'),
    controller: TangiblesTagComponent,
    controllerAs: 'vm'
  })
  .component('tangiblesFavoritos', {
    template: require('./tangibles-favoritos.html'),
    controller: TangiblesFavoritosComponent,
    controllerAs: 'vm'
  })
  .component('tangiblesVer', {
    template: require('./tangibles-ver.html'),
    controller: TangiblesVerComponent,
    controllerAs: 'vm'
  })
  .name;