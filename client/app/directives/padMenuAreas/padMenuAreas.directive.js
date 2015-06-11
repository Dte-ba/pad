'use strict';

angular.module('padApp')
  .directive('padMenuAreas', function ($document) {
    return {
      templateUrl: 'app/directives/padMenuAreas/padMenuAreas.html',
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.menu = element.roulette();

        angular
          .element(window.document)
          .bind('click', function() {
          
          if (scope.menu.opened === true) {
            scope.menu.hide();
          }

        });

        element.bind('click', function(e) {
          var br = element.children('.border-roulette');
          
          var rotation = br.rotation();
          br.rotation(rotation);
          scope.menu.toggle( window.Math.convertDegs("degs", rotation) );
          e.stopPropagation();
        });
        
      }
    };
  });