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

padpanelControllers.controller 'RepositoryAddCtrl', [ '$scope', '$location', 'RepositoryInfo', ($scope, $location, RepositoryInfo) ->
    {repo} = $location.search()
    if !repo
      repo = 'local'
    $scope.packages = []
    $scope.selectedRepo = repo
    $scope.readingQr = false
    $scope.epmUri = ''
    $scope.isScanning = true
    $scope.isFinding = false
    $scope.loadingMessage = 'Buscando paquetes, espere por favor ...'
    $scope.hasFinded = false

    $scope.find = (uri) ->
      $scope.isScanning = false
      $scope.isFinding = true
      url = "#{uri}?expand=content"
      $.getJSON "/request?uri=#{url}"
        .done (data) ->
          pkgs = _.map data, (p) ->
            uid: p.uid
            title: p.content.title
            img: "/request?uri=" + encodeURIComponent "#{uri}?uid=#{p.uid}&asset=front"
          $scope.$apply () ->
            $scope.packages = pkgs
            $scope.isFinding = false
            $scope.hasFinded = true
    # qr
    $('#reader').html5_qrcode(
      (data) ->
        $scope.$apply () ->
          $scope.epmUri = data
          $('#reader').attr('data-qr-remove', '');
          $scope.find data
      (error) ->
      (videoError) ->
     )

  ]