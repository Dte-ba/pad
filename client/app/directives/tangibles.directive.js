'use strict';

angular
  .module('padApp')
  .directive('tangiblesScroller',['Tangibles', '$timeout', function(Tangibles, $timeout) {
    var _ = window._;

    return {
      templateUrl: 'app/templates/tangibles-scroller.html',
      scope: {
        query:  '=tangiblesScroller',
        take:  '=tangiblesTake'
      },
      link: function(scope, element, attrs) {
        var take = scope.take || 10;
        var skip = 0;
        scope.tangibles = [];
        scope.busy = true;
        scope.noResults = false;

        var _reload = function(){
          scope.busy = true;

          Tangibles
            // query, take, skip
            .queryp(scope.query, take, skip)
            .then(function(data){
              scope.tangibles = scope.tangibles.concat(data.items);
              scope.noResults = scope.tangibles.length === 0;
              if (data.total === scope.tangibles.length) {
                return;
              }

              scope.busy = false;
              skip += take;
            });
        };

        scope.$watch('query', function(newVal, oldVal){
          
          if (Object.equals(newVal, oldVal) === true){
            return;
          }

          scope.tangibles  = [];
          take = scope.take || 10;
          scope.busy = true;
          _reload();
        });

        scope.loadMore = function(){
          if (scope.busy) { 
            return; 
          }
          _reload();
        };
      }
    };
  }]);