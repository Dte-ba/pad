'use strict';
const angular = require('angular');

export default angular.module('directive.pinPreload', [])
  .directive('pinPreload', function() {
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
  })
  .name;
