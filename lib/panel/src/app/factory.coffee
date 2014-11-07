'use strict'

padpanelFactory = angular.module 'padpanelFactory', []

padpanelFactory.factory 'RepositoryInfo', ($q) ->
  getAddress = (reponame) ->
    def = $q.defer()
    $.getJSON '/panel/ipaddress', (data) ->
          a = "http://#{data.ipaddress}:#{data.port}/#{reponame}.epm"
          def.resolve a
    def.promise
  return getAddress: getAddress