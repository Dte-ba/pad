'use strict';

angular.module('padApp')
  .controller('TangibleCtrl', function ($rootScope, $scope, $stateParams, $http) {
    

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

    var uid = $stateParams.uid;

    $http
      .get('/epm/metadata/local/' + uid)
      .success(function(data){
        $scope.tangible = data;
      });

    var take = 10;
    var last = 5;

    $scope.all = [];
    $scope.tangibles = [];

    $scope.loadMore = function() {
      take += last;
      $scope.tangibles = _.take($scope.all, take);
    };

    $scope.relFirst = function(){
      if ($scope.tangible === undefined) {
        return;
      }

      var tags = $scope.tangible.content.tags.split(',');
      var mtags = _.map(tags, function(t){
        return _.escapeRegExp(_.trim(t));
      });

      var etag = '(' + mtags.join('|') + ')';
      
      var q = { 'content.tags': { $regex: etag }, $not: { uid: { $regex: uid } } };

      $http
      .post('/epm/query/local', q)
      .success(function(data){
        $scope.all = data;
        $scope.tangibles = _.take($scope.all, take);

        if (data.length === 0) {
          $('#header-relations')
            .html([
              '<div class="col-sm-12 text-center">',
              ' <p><i class="fa fa-warning"></i> No se encontro contenido relacionado</p>',
              '</div>'
            ].join());
        } else {
          $('#header-relations').hide();  
        }
        
      })
      .error(function(){
        
      });

    };

  });
