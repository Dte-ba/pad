'use strict'

padpanelApp = angular.module 'panelApp', [
    'ngRoute',
    'padpanelFactory',
    'padpanelDirective',
    'padpanelControllers',
    'padpanelServices'
  ]

padpanelApp.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
    $locationProvider
        .html5Mode false
    $routeProvider
      .when '/packages/:reponame?',
        templateUrl: '/panel/partials/package-list.html',
        controller: 'PackageListCtrl'
      .when '/package/:id',
        templateUrl: '/panel/partials/package-detail.html',
        controller: 'PackageDetailCtrl'
      .when '/share',
        templateUrl: '/panel/partials/share.html',
        controller: 'ShareCtrl'
      .otherwise redirectTo: '/packages'
  ]