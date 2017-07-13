'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './contacto.routes';

export class ContactoComponent {
  /*@ngInject*/
  constructor(seoService) {
    this.createMetadata(seoService);    
  }

  createMetadata(seoService){
    seoService.title('Contacto | PAD');
    seoService.description('El Programa de Alfabetización Digital es la propuesta pedagógica de la DTE para acompañar a los docentes en la enseñanza TIC, destinada a las escuelas primarias y CEC de la Provincia de Buenos Aires.');
    seoService.keyboards(['pad', 'buenos aires', 'ba', 'educacion' , 'programa provincial', 'alfabetización digital', 'escritorio digital']);
  }
}

export default angular.module('padApp.contacto', [uiRouter])
  .config(routes)
  .component('contacto', {
    template: require('./contacto.html'),
    controller: ContactoComponent,
    controllerAs: 'contactoCtrl'
  })
  .name;
