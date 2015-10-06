'use strict';

angular
  .module('padApp')
  .directive('delayedModel', function() {
    return {
      scope: {
        model: '=delayedModel'
      },
      link: function(scope, element, attrs) {
        
        element.val(scope.model);
        
        scope.$watch('model', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            element.val(scope.model);        
          }
        });
        
        var timeout;
        element.on('keyup paste search', function() {
          clearTimeout(timeout);
          timeout = setTimeout(function() {
            scope.model = element[0].value;
            element.val(scope.model);
            scope.$apply();
          }, attrs.delay || 500);
        });
      }
    };
  })
  .directive('pinPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '@'
      },
      link: function(scope, element, attrs) {
        element.hide();
        element.on('load', function() {
          element.addClass('in');
          element.show();
          element.parent().children('.pin-preload').hide();
        }).on('error', function() {
          //
        });

        scope.$watch('ngSrc', function(newVal) {
          element.removeClass('in');
        });
      }
    };
}]);