'use strict';

var numeral = window.numeral;

angular.module('padApp')
  .controller('StatsCtrl', function ($scope, $rootScope, $http, AreaFactory, seoService) {

    $scope.collapse = function(ele){
      //console.log(ele);
      $('#'+ele).collapse('toggle');
    };

    $scope.charOptions = { 
      animationEasing: "easeOutQuart",
      animationSteps: 30
    };

    seoService.title('Estadísticas | PAD');
    seoService.description('Estadísticas sobre el contenido');
    seoService.keyboards(['estadisticas','area','ejes','bloques']);

    var createStats = function(theareas, data){
      var res = [];

      var _curricular = {};

      var pluckArea = function(cda){
        var a = _curricular[AreaFactory.single(cda.name)] = {
          name: AreaFactory.single(cda.name)
        };
        a.axis = {};
        _.each(cda.axis, function(iax){
          var bls = _.map(iax.blocks, function(b){ return b.name; });

          if (bls.length === 0){
            bls.push('Sin Especificar');
          }
          a.axis[iax.name] = { blocks: bls };
        });
      };

      _.each(theareas, function(cda){
        if (cda.subareas && cda.subareas.length > 0) {
          _.each(cda.subareas, function(scda){
            pluckArea(scda);
          });
        } else {
          pluckArea(cda);
        }

      });

      data = _.map(data, function(item){
        item.area = AreaFactory.single(item.area);
        return item;
      });

      var areas = _.groupBy(data, 'area');

      // AREAS
      _.each(Object.keys(areas), function(a){
        
        //console.log(a);

        var CDA = _curricular[a];
        if (CDA === undefined){
          console.log('Unknown area '+a);
        }

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
          
          var CDax = CDA.axis[ax];
          var amissing = CDax === undefined;

          var axis = {
            name: ax,
            blocks: [],
            length: axises[ax].length,
            size: _.sum(axises[ax], function(axi){ return axi.size; }),
            missing: amissing
          };

          var ct = axises[ax];

          // BLOCKS
          var blockes = _.groupBy(ct, 'block');

          _.each(Object.keys(blockes), function(b) {
            
            var ba = AreaFactory.blockAlias(b);
            var bn = b;
            if (ba !== b){
              bn = ba;
            }

            var bmissing = true;

            if (CDax !== undefined){

              bmissing = !_.include(CDax.blocks, bn);
            }

            var block = {
              name: bn,
              length: blockes[b].length,
              size: _.sum(blockes[b], function(bi){ return bi.size; }),
              missing: bmissing
            };

            axis.blocks.push(block);
          });

          area.axis.push(axis);
        });

        res.push(area);
      });

      res = _.sortBy(res, 'name');
      
      var musica = _.find(res, function(a){ return a.name === 'Ed. Artística - Música'});
      var danza = _.find(res, function(a){ return a.name === 'Ed. Artística - Danza'});
      
      _.each(musica.axis, function(ma){
        _.each(ma.blocks, function(b){
          //console.log("_largeBlockAlias['Ed. Artística - Música"+ma.name+AreaFactory.blockAlias(b.name)+"'] = '"+b.name+"';")
        });
      });

       _.each(danza.axis, function(ma){
        _.each(ma.blocks, function(b){
          //console.log("_largeBlockAlias['Ed. Artística - Danza"+ma.name+AreaFactory.blockAlias(b.name)+"'] = '"+b.name+"';")
        });

        
        $scope.total = Object.keys(data).length;
        $scope.areas = res;
        //console.log(JSON.stringify($scope.areas, null, 2));
        //console.log($scope.areas);

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
      });

    };

    $http
      .get('/api/design/areas')
      .success(function(theareas){

        $http
        .get('/epm/stats/'+$rootScope.repository)
        .success(function(data){
          createStats(theareas, data);
        })
        .error(function(err){
          console.log('/epm/stats/'+$rootScope.repository);
          console.log(err);
        });

      })
      .error(function(err){
        console.log('/epm/design/areas');
        console.log(err);
      });

  });
