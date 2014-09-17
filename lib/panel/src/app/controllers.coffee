'use strict'

padpanelControllers = angular.module 'padpanelControllers', []

padpanelControllers.controller 'RepoListCtrl', [ '$scope', '$location', 'Repo', ($scope, $location, Repo) ->
    {repo} = $location.search()
    if repo
      $scope.selectedRepo = repo
    else
      repo = 'local'

    Repo.get (info) ->
      $scope.repos = info.repos

    $scope.selectedRepo = repo

    $scope.searchText = ''
    
    $scope.changeRepo = (item) ->
      $scope.selectedRepo = item
      $location.search({repo:item})
  ]

padpanelControllers.controller 'PackageListCtrl', [ '$scope', '$location', 'Package', ($scope, $location, Package) ->
    {repo} = $location.search()
    if !repo
      repo = 'local'
    $scope.selectedRepo = repo
    $scope.packages = Package.query({repo: repo})
  ]

padpanelControllers.controller 'ShareCtrl', [ '$scope', '$location', 'Package', 'RepositoryInfo', ($scope, $location, Package, RepositoryInfo) ->
    {repo} = $location.search()
    if !repo
      repo = 'local'
    RepositoryInfo
      .getAddress repo
      .then (ad) ->
        $scope.address = ad
  ]
