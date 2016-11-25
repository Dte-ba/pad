'use strict';

angular.module('padApp')
  .controller('MainCtrl', function ($rootScope, $timeout, seoService, $stateParams) {
    seoService.title('Bienvenidos | PAD');
    seoService.description('El Programa de Alfabetización Digital es la propuesta pedagógica de la DTE para acompañar a los docentes en la enseñanza TIC, destinada a las escuelas primarias y CEC de la Provincia de Buenos Aires.');
    seoService.keyboards(['pad', 'buenos aires', 'ba', 'educacion' , 'programa provincial', 'alfabetización digital', 'escritorio digital']);

    $rootScope._localip = $rootScope._localip || $stateParams.ip;
    $rootScope._mode = $rootScope._mode || $stateParams.mode;
    $rootScope._port = $rootScope._port || $stateParams.port;

    var html = '<div class="text-center"><strong>Tu PAD en Red</strong></div>' + 
               '<div class="text-center">Tus estudiantes pueden acceder en su navegador desde</div>' + 
               '<div class="text-center"><strong>http://'+$rootScope._localip+':'+ $rootScope._port+'</strong></div>';

    if ($rootScope._localip === '127.0.0.1'){
      html = '<div class="text-center"><strong>Tu PAD en Red</strong></div>' + 
             '<div class="text-center">Al parecer no estas conectado a una red</div>';
    }

    $('document').ready(function(){
      $('#to-info').popover({
        placement: 'bottom',
        html: true,
        content: html,
        show: 0, 
        hide: 200
      });

      $('#to-info').click(function(){
        //$(this).popover('toggle');
      });
    });
    
  });
