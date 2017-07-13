const angular = require('angular');
const uiRouter = require('angular-ui-router');

import routes from './bienvenido.routes';

export default angular.module('padApp.bienvenido', [uiRouter])
  .config(routes)
  .name;