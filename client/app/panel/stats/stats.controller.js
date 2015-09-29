'use strict';

var numeral = window.numeral;

angular.module('padApp')
  .controller('StatsCtrl', function ($scope, $http) {
    $http
      .get('/epm/stats/local')
      .success(function(data){
        
         //console.log(cts);
        var res = [];

        var ts = _.sum(data, function(d){
          return d.size;
        });

        var areas = _.groupBy(data, 'area');

        // AREAS
        _.each(Object.keys(areas), function(a){
          
          //console.log(a);

          var area = {
            name: a,
            axis: [],
            length: areas[a].length,
            size: _.sum(areas[a], function(ai){ return ai.size; })
          };

          var ct = areas[a];
          

          var axises = _.groupBy(ct, 'axis');

          // AXIS
          _.each(Object.keys(axises), function(ax){
            var axis = {
              name: ax,
              blocks: [],
              length: axises[ax].length,
              size: _.sum(axises[ax], function(axi){ return axi.size; })
            };

            var ct = axises[ax];

            // BLOCKS
            var blockes = _.groupBy(ct, 'block');

            _.each(Object.keys(blockes), function(b) {
                var block = {
                  name: b,
                  length: blockes[b].length,
                  size: _.sum(blockes[b], function(bi){ return bi.size; })
                };

                axis.blocks.push(block);
            });

            area.axis.push(axis);
          });

          res.push(area);

        });

        
        $scope.total = Object.keys(data).length;
        $scope.areas = res;

        $scope.labels = [];
        $scope.data = [];

        $scope.labelsSize = [];
        $scope.dataSize = [];

        _.each(Object.keys(areas), function(key){
           
          var size = _.sum(_.map(areas[key], function(item){
            return item.size;
          }));

          var formatedSize = numeral(size).format('0 b');
          $scope.labelsSize.push(key + ' (' + formatedSize + ')');
          $scope.dataSize.push(size);

          $scope.labels.push(key + ' (' + areas[key].length + ')');
          $scope.data.push(areas[key].length);
        });

        $scope.totalSize = _.sum($scope.dataSize);
        //console.log($scope.totalSize);
      })
      .error(function(err){
        console.log(err);
      });
  });
