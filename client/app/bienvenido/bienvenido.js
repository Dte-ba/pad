'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bienvenido', {
        url: '/bienvenido',
        abstract: true,
        templateUrl: 'app/bienvenido/bienvenido.html',
        controller: function($scope, $window) {
          $scope.menuItems = [
            {
              state: 'bienvenido.presentacion',
              title: 'Presentación'
            },
            {
              state: 'bienvenido.acercade',
              title: 'Acerca del PAD'
            },
            /*{
              state: 'bienvenido.marco',
              title: 'Marco General'
            },*/
            {
              state: 'bienvenido.encuadres',
              title: 'Encuadre de la Areas y CEC'
            }
          ];
        }
      })
      .state('bienvenido.presentacion', {
        url: '/Presentacion',
        views: {
          "content": {
            templateUrl: 'app/bienvenido/presentacion.html',
            controller: function($scope, $window) {
              var timer = setInterval(function(){
                if ($('.swiper-container').length > 0){
                  var Swiper = $window.Swiper;
                   var swiperH = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 50,
                        autoplay: 7000,
                        speed: 600
                    });
                  $window.clearInterval(timer);
                }
              }, 100);
            }
          }
        }
      })
      .state('bienvenido.acercade', {
        url: '/Acerca',
        views: {
          "content": {
            templateUrl: 'app/bienvenido/acercade.html'
          }
        }
      })
      /*.state('bienvenido.marco', {
        url: '/Marco',
        views: {
          "content": {
            templateUrl: 'app/bienvenido/marco.html'
          }
        }
      })*/
      .state('bienvenido.encuadres', {
        url: '/Encuadres',
        views: {
          "content": {
            templateUrl: 'app/bienvenido/encuadres.html',
            controller: function($scope, $window, $http) {
              $http
                .get('/api/design/encuadres')
                .success(function(data){
                  $scope.encuadres = data;
                });
            }
          }
        }
      })
      ;
  });