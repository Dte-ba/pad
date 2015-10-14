'use strict';

angular.module('padApp')
  .controller('TangiblesCtrl', function ($rootScope, $scope, $stateParams, $timeout, AreaFactory, seoService) {
    
    $scope.area = $stateParams.area;
    $scope.sarea = AreaFactory.alias($stateParams.area);
    $scope.axis = $stateParams.axis;
    $scope.block = $stateParams.block;

    $scope.iniciando = true;

    $scope.query = {};
    $scope.take = 15;
    
    var sections = [$scope.area];

    var q = [];

    if ($scope.area !== undefined){
      q = AreaFactory.query($scope.area);
    }

    if ($scope.axis !== undefined){
      _.each(q, function(a){
        a['content.axis'] = $scope.axis;
      });
      sections.push($scope.axis);
    }

    if ($scope.block !== undefined){ 
      _.each(q, function(a){
        var ba = AreaFactory.inverseBlockAlias($scope.area, $scope.axis, $scope.block);
        if (ba !== $scope.block){
          a['content.block'] = { $in: [ba, $scope.block]};
          console.log(a);
        } else {
          a['content.block'] = $scope.block;  
        }
        
      });
      sections.push($scope.block);
    }

    if (q.length === 1) {
      q = q[0];
    } else if (q.length > 1) {
      q = { $or: q};
    }

    $timeout(function(){
      $scope.query = q;
      $scope.iniciando = false;
    }, 500);

    seoService.title(sections.join(' - ') + ' | PAD');
    seoService.description('Contenido correspondiente a  ' + sections.join(' - '));
    seoService.keyboards(['contenido digital', 'diseño curricular'].concat(sections));

  })
  .controller('TagTangiblesCtrl', function ($scope, $stateParams, $timeout, $http, seoService) {

    $scope.tag = $stateParams.tag;
    var etag = _.escapeRegExp(_.trim($scope.tag));

    $scope.take = 10;
    $scope.query = {};
    $scope.iniciando = true;

    $timeout(function(){
      $scope.query = { 'content.tags': { $regex: etag } };
      $scope.iniciando = false;
    }, 500);

    seoService.title('Palabra clave '+$stateParams.tag+' | PAD');
    seoService.description('Resultados para palabra clave ' + $stateParams.tag);
    seoService.keyboards(['contenido digital', 'diseño curricular', 'tag', 'palabra clave', $stateParams.tag]);
    
  })
  .controller('SearchTangiblesCtrl', function ($scope, $state, $stateParams, $location, $timeout, $http, seoService) {
    $scope.texto = $stateParams.texto;
    $scope.searchText = $scope.texto;

    var trimTexto = _.trim($scope.texto);
    $scope.iniciando = true;
    
    function _search(){
      if ($scope.searchText === undefined) {
        return;
      }
      /*if ($scope.searchText === trimTexto) {
        return;
      }*/
      //$state.go('tangibles.buscar', {texto: $scope.searchText });
      $stateParams['texto'] = $scope.searchText;
      $state.params['texto'] = $scope.searchText;
      $location.search('texto', $scope.searchText);

      _realseSearch($scope.searchText);
    }

    $scope.search = function(){
      _search();
    };
    
    $scope.query = {};

    function _realseSearch(target){
      trimTexto = _.trim(target);
      var texto = _.escapeRegExp(trimTexto);

      $scope.query = { 
        $or: [
          { 'content.tags': { $regex: texto.scapeRegex() } },
          { 'content.content': { $regex: texto.scapeRegex() } },
          { 'content.title': { $regex: texto.scapeRegex() } },
          { 'uid': { $regex: texto.scapeRegex() } }
        ]
      };

      seoService.title('Búsqueda para '+target+' | PAD');
      seoService.description('Resultados de busqueda para ' + target);
      seoService.keyboards(['contenido digital', 'busqueda', 'diseño curricular', 'tag', 'palabra clave', target]);
    }

    $timeout(function(){
      //_search();

      $scope.$watch('searchText', function(){
        _search();
      });

      $scope.iniciando = false;
      $('#searchInput').focus();
    }, 500);
        
  })
  .controller('FavoritosTangiblesCtrl', function ($scope, $rootScope, $stateParams, $timeout, $http, Favoritos, seoService) {
    $scope.take = 10;
    $scope.query = {};
    $scope.iniciando = true;

    $timeout(function(){
      var favs = Favoritos.getFavoritos();
      $scope.query = { 'uid': { '$in': $rootScope.favoritos } };
      $scope.iniciando = false;

      seoService.title('Mis pines | PAD');
      seoService.description('Contenido en favoritos');
      seoService.keyboards(['contenido digital', 'busqueda', 'diseño curricular', 'favoritos']);
    }, 500);
  });
  