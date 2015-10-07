'use strict';

var numeral = window.numeral;

angular.module('padApp')
  .controller('StatsCtrl', function ($scope, $http) {

    $scope.collapse = function(ele){
      //console.log(ele);
      $('#'+ele).collapse('toggle');

    };

    $scope.charOptions = { 
      animationEasing: "easeOutQuart",
      animationSteps: 30
    };

    $http
      .get('/epm/stats/local')
      .success(function(data){
        
        //console.log(data);
        var res = [];

        var alias = {};
        alias['CEC'] = 'CEC';
        alias['Centros Educativos Complementarios'] = 'CEC';
        alias['Ciencias Naturales'] = 'Ciencias Naturales';
        alias['Ciencias Sociales'] = 'Ciencias Sociales';
        alias['Ed. Artística - Danza'] = 'Ed. Artística - Danza';
        alias['Ed. Artística - Música'] = 'Ed. Artística - Música';
        alias['Ed. Artística - Plástica'] = 'Ed. Artística - Plástica';
        alias['Ed. Artística - Música'] = 'Ed. Artística - Música';
        alias['Educación Artística - Música'] = 'Ed. Artística - Música';
        alias['Educación Física'] = 'Educación Física';
        alias['EOE'] = 'EOE';
        alias['Equipos de Orientación Escolar'] = 'EOE';
        alias['Inglés'] = 'Inglés';
        alias['Matemática'] = 'Matemática';
        alias['PAD en acción'] = 'PAD en acción';
        alias['Prácticas del Lenguaje'] = 'Prácticas del Lenguaje';
        alias['Temas Transversales'] = 'Temas Transversales';

        _.each(data, function(item){
          item.area = alias[item.area];
        });

        var areas = _.groupBy(data, 'area');
        // AREAS
        _.each(Object.keys(areas), function(a){
          
          //console.log(a);

          var area = {
            name: a,
            axis: [],
            length: areas[a].length,
            size: _.sum(areas[a], function(ai){ return ai.size; }),
            shortname: _.kebabCase(a)
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

        res = _.sortBy(res, 'name');

        
        $scope.total = Object.keys(data).length;
        $scope.areas = res;
        //console.log(JSON.stringify($scope.areas, null, 2));

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

          $scope.labels.push(key);
          $scope.data.push(areas[key].length);
        });

        $scope.totalSize = _.sum($scope.dataSize);
        //console.log($scope.totalSize);
      })
      .error(function(err){
        console.log(err);
      });
  });
