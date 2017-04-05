'use strict';

angular.module('padApp')
  .controller('ContactoCtrl', function ($rootScope, $timeout, seoService, $stateParams) {
    seoService.title('Contacto | PAD');
    seoService.description('El Programa de Alfabetización Digital es la propuesta pedagógica de la DTE para acompañar a los docentes en la enseñanza TIC, destinada a las escuelas primarias y CEC de la Provincia de Buenos Aires.');
    seoService.keyboards(['pad', 'buenos aires', 'ba', 'educacion' , 'programa provincial', 'alfabetización digital', 'escritorio digital']);
    
  });
