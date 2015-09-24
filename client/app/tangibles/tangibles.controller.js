'use strict';

angular.module('padApp')
  .controller('TangiblesCtrl', function ($rootScope, $scope, $stateParams, $http) {
    
    var alias = {};
    alias['PAD en acción'] = 'pea';
    alias['Inglés'] = 'ing';
    alias['Ciencias Naturales'] = 'cn';
    alias['Educación Física'] = 'ef';
    alias['Ciencias Sociales'] = 'cs';
    alias['Matemática'] = 'mat';
    alias['Prácticas del Lenguaje'] = 'pdl';
    alias['Educación Artística'] = 'edar';
    alias['Ed. Artística - Plástica'] = 'edarp';
    alias['Ed. Artística - Música'] = 'edarm';
    alias['Ed. Artística - Danza'] = 'edard';
    alias['Ed. Artística - Teatro'] = 'edart';
    alias['Equipos de Orientación Escolar'] = 'eoe';
    alias['Centros Educativos Complementarios'] = 'cec';
    alias['Orientación PAD'] = 'op';
    alias['Temas Transversales'] = 'tt';

    var _query = {};
    _query['PAD en acción'] = [{'content.area': 'PAD en acción'}];
    _query['Inglés'] = [{'content.area':'Inglés'}];
    _query['Ciencias Naturales'] = [{'content.area':'Ciencias Naturales'}];
    _query['Educación Física'] = [{'content.area':'Educación Física'}];
    _query['Ciencias Sociales'] = [{'content.area':'Ciencias Sociales'}];
    _query['Matemática'] = [{'content.area':'Matemática'}];
    _query['Prácticas del Lenguaje'] = [{'content.area':'Prácticas del Lenguaje'}];
    _query['Ed. Artística - Plástica'] = [{'content.area':'Ed. Artística - Plástica'}];
    _query['Ed. Artística - Música'] = [{'content.area':'Ed. Artística - Música'}, {'content.area':'Educación Artística - Música'}];
    _query['Ed. Artística - Danza'] = [{'content.area':'Ed. Artística - Danza'}];
    _query['Ed. Artística - Teatro'] = [{'content.area':'Ed. Artística - Teatro'}];
    _query['Equipos de Orientación Escolar'] = [{'content.area':'Equipos de Orientación Escolar'}, {'content.area':'EOE'}];
    _query['Centros Educativos Complementarios'] = [{'content.area':'Centros Educativos Complementarios'}, {'content.area':'CEC'}];
    _query['Orientación PAD'] = [{'content.area':'Orientación PAD'}];
    _query['Temas Transversales'] = [{'content.area':'Temas Transversales'}];

    var getAlias = function(aname){
      return alias[aname];
    };

    $scope.area = $stateParams.area;
    $scope.sarea = alias[$stateParams.area];
    $scope.axis = $stateParams.axis;
    $scope.block = $stateParams.block;

    $scope.filter = function(area){
      
    };

    //$rootScope.area = $scope.area;
    //$rootScope.showCartoon = true;

    var q = [];

    if ($scope.area !== undefined){
      q = _query[$scope.area];
    }

    if ($scope.axis !== undefined){
      _.each(q, function(a){
        a['content.axis'] = $scope.axis;
      });
    }

    if ($scope.block !== undefined){ 
      _.each(q, function(a){
        a['content.block'] = $scope.block;
      });
    }

    if (q.length === 1) {
      q = q[0];
    } else if (q.length > 1) {
      q = { $or: q};
    }

    var take = 10;
    var last = 5;

    $scope.all = [];
    $scope.tangibles = [];

    $scope.loadMore = function() {
      take += last;
      $scope.tangibles = _.take($scope.all, take);
    };

    $http
      .post('/epm/query/local', q)
      .success(function(data){

        data = _.map(data, function(i){
          i.sarea = getAlias(i.content.area);
          return i;
        });

      //console.log(data);

        $scope.all = data;
        $scope.tangibles = _.take($scope.all, take);
      })
      .error(function(){
        
      });

  })
  .controller('TagTangiblesCtrl', function ($scope, $stateParams, $http) {
    $scope.tag = $stateParams.tag;
    var etag = _.escapeRegExp(_.trim($scope.tag));

    var q = { 'content.tags': { $regex: etag } };

    var take = 10;
    var last = 5;

    $scope.all = [];
    $scope.tangibles = [];

    $scope.loadMore = function() {
      take += last;
      $scope.tangibles = _.take($scope.all, take);
    };

    var alias = {};
    alias['PAD en acción'] = 'pea';
    alias['Inglés'] = 'ing';
    alias['Ciencias Naturales'] = 'cn';
    alias['Educación Física'] = 'ef';
    alias['Ciencias Sociales'] = 'cs';
    alias['Matemática'] = 'mat';
    alias['Prácticas del Lenguaje'] = 'pdl';
    alias['Educación Artística'] = 'edar';
    alias['Ed. Artística - Plástica'] = 'edarp';
    alias['Ed. Artística - Música'] = 'edarm';
    alias['Ed. Artística - Danza'] = 'edard';
    alias['Ed. Artística - Teatro'] = 'edart';
    alias['Equipos de Orientación Escolar'] = 'eoe';
    alias['Centros Educativos Complementarios'] = 'cec';
    alias['Orientación PAD'] = 'op';
    alias['Temas Transversales'] = 'tt';

    $http
      .post('/epm/query/local', q)
      .success(function(data){
        data = _.map(data, function(i){
          i.sarea = alias[i.content.area];
          return i;
        });
        
        $scope.all = data;
        $scope.tangibles = _.take($scope.all, take);
      })
      .error(function(){
        
      });

  })
  .controller('SearchTangiblesCtrl', function ($scope, $state, $stateParams, $http) {
    $scope.texto = $stateParams.texto;
    $scope.searchText = $scope.texto;

    var trimTexto = _.trim($scope.texto);
    var texto = _.escapeRegExp(trimTexto);

    var alias = {};
    alias['PAD en acción'] = 'pea';
    alias['Inglés'] = 'ing';
    alias['Ciencias Naturales'] = 'cn';
    alias['Educación Física'] = 'ef';
    alias['Ciencias Sociales'] = 'cs';
    alias['Matemática'] = 'mat';
    alias['Prácticas del Lenguaje'] = 'pdl';
    alias['Educación Artística'] = 'edar';
    alias['Ed. Artística - Plástica'] = 'edarp';
    alias['Ed. Artística - Música'] = 'edarm';
    alias['Ed. Artística - Danza'] = 'edard';
    alias['Ed. Artística - Teatro'] = 'edart';
    alias['Equipos de Orientación Escolar'] = 'eoe';
    alias['Centros Educativos Complementarios'] = 'cec';
    alias['Orientación PAD'] = 'op';
    alias['Temas Transversales'] = 'tt';

    var q = { 
      $or: [
        { 'content.tags': { $regex: texto } },
        { 'content.content': { $regex: texto } },
        { 'content.title': { $regex: texto } },
        { 'uid': { $regex: texto } }
      ]
    };

    var take = 10;
    var last = 5;

    $scope.all = [];
    $scope.tangibles = [];

    $scope.loadMore = function() {
      take += last;
      $scope.tangibles = _.take($scope.all, take);
    };

    $scope.search = function(){
      if ($scope.searchText === trimTexto) {
        return;
      }
      $state.go('tangibles.buscar', {texto: $scope.searchText });
    };

    $scope.$watch('searchText', function(){
      if ($scope.searchText === undefined) {
        return;
      }
      if ($scope.searchText === trimTexto) {
        return;
      }
      $state.go('tangibles.buscar', {texto: $scope.searchText });
    });

    if (trimTexto !== undefined && trimTexto !== ''){
      $http
        .post('/epm/query/local', q)
        .success(function(data){
          
          data = _.map(data, function(i){
            i.sarea = alias[i.content.area];
            return i;
          });

          $scope.all = data;
          $scope.tangibles = _.take($scope.all, take);
        })
        .error(function(){
          
        });  
    }
    
  });
