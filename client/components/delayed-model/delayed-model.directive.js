'use strict';
const angular = require('angular');

export default angular.module('directives.delayedModel', [])
  .directive('delayedModel', function() {
    return {
      scope: {
        model: '=delayedModel'
      },
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.val(scope.model);
        scope.$watch(() => { return scope.model; }, function(newVal, oldVal) {
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
  .name;
