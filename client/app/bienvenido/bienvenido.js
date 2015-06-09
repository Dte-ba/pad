'use strict';

angular.module('padApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bienvenido', {
        url: '/bienvenido',
        abstract: true,
        templateUrl: 'app/bienvenido/bienvenido.html'
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
      ;
  });