'use strict'

padpanelApp = angular.module 'panelApp', [
    'ngRoute',
    'padpanelFactory',
    'padpanelDirective',
    'padpanelControllers',
    'padpanelServices',
    # vendor
    'xeditable'
  ]

padpanelApp.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
    $locationProvider
        .html5Mode false
    $routeProvider
      .when '/packages/:reponame?',
        templateUrl: '/panel/partials/package-list.html',
        controller: 'PackageListCtrl'
      .when '/package/view/:id',
        templateUrl: '/panel/partials/package-detail.html',
        controller: 'PackageDetailCtrl'
      .when '/share',
        templateUrl: '/panel/partials/share.html',
        controller: 'ShareCtrl'
      .when '/repository/add',
        templateUrl: '/panel/partials/repository-add.html',
        controller: 'RepositoryAddCtrl'
      .when '/package/add',
        templateUrl: '/panel/partials/package-add.html',
        controller: 'PackageAddCtrl'
      .otherwise redirectTo: '/packages'
  ]

padpanelApp.run (editableOptions) ->
  editableOptions.theme = 'bs3'