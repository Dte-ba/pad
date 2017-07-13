'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, seoServiceProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  seoServiceProvider.config({
    title: 'PAD',
    description: 'El Programa de Alfabetización Digital es la propuesta pedagógica de la DTE para acompañar a los docentes en la enseñanza TIC, destinada a las escuelas primarias y CEC de la Provincia de Buenos Aires.',
    keyboards: ['pad', 'buenos aires', 'ba', 'educacion' , 'programa provincial', 'alfabetización digital', 'escritorio digital'],
    resetOnChange: true
  });
}

export function appRun($rootScope, $state, $stateParams, localStorageService) {
  'ngInject';

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.showCartoon = false;
  $rootScope.repository = 'local';
  $rootScope.favoritos = [];
  $rootScope.favoritosSupported = localStorageService.isSupported;
  
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

