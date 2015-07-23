'use strict';

describe('Directive: padMenuAreas', function () {

  // load the directive's module and view
  beforeEach(module('padApp'));
  beforeEach(module('app/directives/padMenuAreas/padMenuAreas.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pad-menu-areas></pad-menu-areas>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the padMenuAreas directive');
  }));
});