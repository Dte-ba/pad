'use strict';

import angular from 'angular';
import _ from 'lodash';
import tangiblesService from '../../app/services/tangibles.service';

export default angular.module('padApp.tangiblesScroller', [tangiblesService])
  .directive('tangiblesScroller', (Tangibles) => {
    'ngInject';
    return {
      template: require('./tangibles-scroller.html'),
      restrict: 'EA',
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

          if (_.keys(scope.query).length === 0){
            scope.busy = false;
            scope.noResults = true;
            return;
          }

          if (scope.query.hasOwnProperty('text')){
            if (!scope.query.text || scope.query.text === ''){
              scope.busy = false;
              scope.noResults = true;
              return;
            }
          }
          
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

        scope.$watch(() => { return scope.query; }, function(newVal, oldVal){

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

        _reload();
      }
    };
  })
  .name;
