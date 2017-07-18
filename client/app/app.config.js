'use strict';

import $ from 'jquery';

export function routeConfig($urlRouterProvider, $locationProvider, seoServiceProvider, localStorageServiceProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
  
  localStorageServiceProvider.setPrefix('padApp');

  seoServiceProvider.config({
    title: 'PAD',
    description: 'El Programa de Alfabetización Digital es la propuesta pedagógica de la DTE para acompañar a los docentes en la enseñanza TIC, destinada a las escuelas primarias y CEC de la Provincia de Buenos Aires.',
    keyboards: ['pad', 'buenos aires', 'ba', 'educacion' , 'programa provincial', 'alfabetización digital', 'escritorio digital'],
    resetOnChange: true
  });
}

export function appRun($http, $rootScope, $state, $location, $stateParams, localStorageService) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.showCartoon = false;
  $rootScope.repository = 'local';
  $rootScope.favoritos = [];
  $rootScope.favoritosSupported = localStorageService.isSupported;

  $rootScope._localip = $rootScope._localip || $location.$$search.ip;
  $rootScope._mode = $rootScope._mode || $location.$$search.mode;
  $rootScope._port = $rootScope._port || $location.$$search.port;

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

    $http
      .get('/api/info')
      .then(function(response){
        var info = response.data;
        $('#to-folder').click(() =>{
          $http.post('/open?path='+ encodeURIComponent(info.repository));
        });
      });
    
    
  });
  
  if (localStorageService.isSupported) {
    var fav = localStorageService.get('favoritos');
    
    if (fav === undefined || fav === null){
      localStorageService.set('favoritos', []);
    }

    $rootScope.favoritos = localStorageService.get('favoritos');
  }
  
  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.showCartoon = false;
    $rootScope.area = '';
  });
}

