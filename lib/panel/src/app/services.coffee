'use strict'

padpanelServices = angular.module 'padpanelServices', ['ngResource']

padpanelServices.factory 'Repo', [ '$resource', ($resource) ->
    $resource '/repository', {}
  ]

padpanelServices.factory 'Package', [ '$resource', ($resource) ->
    $resource '/package', { },
      query: method:'GET', isArray: true, params: repo: '@repo'
  ]