'use strict';

describe('Directive: padAsideMenu', function () {

  // load the directive's module
  beforeEach(module('padApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pad-aside-menu></pad-aside-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the padAsideMenu directive');
  }));
});