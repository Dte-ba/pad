'use strict';

angular.module('padApp')
  .directive('padMenuAreas', function ($rootScope, $timeout) {
    return {
      templateUrl: 'app/directives/padMenuAreas/padMenuAreas.html',
      restrict: 'A',
      link: function (scope, element) {
        scope.menu = element.roulette();

        angular
          .element(window.document)
          .bind('click', function() {
           if ($('#aside-menu').hasClass('active')) {
              $('#aside-menu').removeClass('active');
            }
           if (scope.menu.opened === true) {
             scope.menu.hide();
           }

        });

        element.bind('click', function(e) {
          var br = element.children('.border-roulette');
          
          var rotation = br.rotation();
          br.rotation(rotation);
          element.toggleClass('inactive');
          scope.menu.toggle( window.Math.convertDegs('degs', rotation) );
          e.stopPropagation();
        });

        element
          .children('ul.roulette')
          .children('li')
          .hover(function(e) {
            var elem = $(e.currentTarget);
            var area = elem.children('a')
                           .children('.item-area')
                           .attr('data-area');
          
            var currentArea = $('html').data('area');

             if(e.type === 'mouseover' || e.type === 'mouseenter' ) {
              element
                .children('.center-roulette-area')
                .addClass('active');

              $rootScope.showCartoon = true;
              $('.area-cartoon').addClass('active');
              
              element
                .children('.center-roulette-area')
                .attr('data-area', area);

              $('html').attr('data-area', area);
            } else {
              element
                .children('.center-roulette-area')
                .removeClass('active');

              $rootScope.showCartoon = false;
              $('.area-cartoon').removeClass('active');

              element
                .children('.center-roulette-area')
                .removeAttr('data-area');

              $('html').attr('data-area', area);

              if (currentArea !== undefined && !$('body').hasClass('home')) {
                $('.area-cartoon').addClass('active');
                $rootScope.showCartoon = true;
                $('html').attr('data-area', currentArea);              
              }
            }
          });

          element
          .children('ul.roulette')
          .children('li')
          .on('mouseleave', function() {
              $('.area-cartoon').removeClass('active');
          });

          element
          .children('ul.roulette')
          .children('li')
          .click(function(e) {
            if ($('.bg-lock').hasClass('showing')){
              if (scope.menu.opened === true) {
                 scope.menu.hide();
              }
              setTimeout(function() {
                $('.bg-lock').removeClass('showing');
              }, 500);
            }
            e.stopPropagation();
          });

          // remove from here
          $timeout(function(){
            
            $('#aside-area-menu').click(function(){
              $('.bg-lock').toggleClass('showing');
            });

            $('.bg-lock').click(function(){
              if ($('.bg-lock').hasClass('showing')){
                if (scope.menu.opened === true) {
                   scope.menu.hide();
                }
                setTimeout(function() {
                  $('.bg-lock').removeClass('showing');
                }, 300);
                //$('.bg-lock').removeClass('showing');
                event.stopPropagation();
              }
            });

          });
      }
    };
  });