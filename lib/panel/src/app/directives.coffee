'use strict'

padpanelDirective = angular.module 'padpanelDirective', []

padpanelDirective.directive 'qr', ($parse) ->
  restrict: "EA"
  replace: true
  link: (scope, element, attrs) ->
    scope.$watch attrs.qr, (newValue, oldValue) ->
      return if !newValue
      element.qrcode 
        "width": 100
        "height": 100
        "text": newValue
      