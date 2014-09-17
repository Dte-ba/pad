(function() {
  'use strict';
  var padpanelApp;

  padpanelApp = angular.module('panelApp', ['ngRoute', 'padpanelFactory', 'padpanelDirective', 'padpanelControllers', 'padpanelServices']);

  padpanelApp.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(false);
      return $routeProvider.when('/packages/:reponame?', {
        templateUrl: '/panel/partials/package-list.html',
        controller: 'PackageListCtrl'
      }).when('/package/:id', {
        templateUrl: '/panel/partials/package-detail.html',
        controller: 'PackageDetailCtrl'
      }).when('/share', {
        templateUrl: '/panel/partials/share.html',
        controller: 'ShareCtrl'
      }).otherwise({
        redirectTo: '/packages'
      });
    }
  ]);

}).call(this);

(function() {
  'use strict';
  var padpanelDirective;

  padpanelDirective = angular.module('padpanelDirective', []);

  padpanelDirective.directive('qr', function($parse) {
    return {
      restrict: "EA",
      replace: true,
      link: function(scope, element, attrs) {
        return scope.$watch(attrs.qr, function(newValue, oldValue) {
          if (!newValue) {
            return;
          }
          return element.qrcode({
            "width": 100,
            "height": 100,
            "text": newValue
          });
        });
      }
    };
  });

}).call(this);

(function() {
  'use strict';
  var padpanelFactory;

  padpanelFactory = angular.module('padpanelFactory', []);

  padpanelFactory.factory('RepositoryInfo', function($q) {
    var getAddress;
    getAddress = function(reponame) {
      var def;
      def = $q.defer();
      $.getJSON('/panel/ipaddress', function(data) {
        var a;
        a = "http://" + data.ipaddress + ":" + data.port + "/" + reponame + ".epm";
        return def.resolve(a);
      });
      return def.promise;
    };
    return {
      getAddress: getAddress
    };
  });

}).call(this);

(function() {
  'use strict';
  var padpanelControllers;

  padpanelControllers = angular.module('padpanelControllers', []);

  padpanelControllers.controller('RepoListCtrl', [
    '$scope', '$location', 'Repo', function($scope, $location, Repo) {
      var repo;
      repo = $location.search().repo;
      if (repo) {
        $scope.selectedRepo = repo;
      } else {
        repo = 'local';
      }
      Repo.get(function(info) {
        return $scope.repos = info.repos;
      });
      $scope.selectedRepo = repo;
      $scope.searchText = '';
      return $scope.changeRepo = function(item) {
        $scope.selectedRepo = item;
        return $location.search({
          repo: item
        });
      };
    }
  ]);

  padpanelControllers.controller('PackageListCtrl', [
    '$scope', '$location', 'Package', function($scope, $location, Package) {
      var repo;
      repo = $location.search().repo;
      if (!repo) {
        repo = 'local';
      }
      $scope.selectedRepo = repo;
      return $scope.packages = Package.query({
        repo: repo
      });
    }
  ]);

  padpanelControllers.controller('ShareCtrl', [
    '$scope', '$location', 'Package', 'RepositoryInfo', function($scope, $location, Package, RepositoryInfo) {
      var repo;
      repo = $location.search().repo;
      if (!repo) {
        repo = 'local';
      }
      return RepositoryInfo.getAddress(repo).then(function(ad) {
        return $scope.address = ad;
      });
    }
  ]);

}).call(this);

(function() {
  'use strict';
  var padpanelServices;

  padpanelServices = angular.module('padpanelServices', ['ngResource']);

  padpanelServices.factory('Repo', [
    '$resource', function($resource) {
      return $resource('/repository', {});
    }
  ]);

  padpanelServices.factory('Package', [
    '$resource', function($resource) {
      return $resource('/package', {}, {
        query: {
          method: 'GET',
          isArray: true,
          params: {
            repo: '@repo'
          }
        }
      });
    }
  ]);

}).call(this);
