/**
 * The main page of PAD
 */
!function($, ko, _, window, undefined){
  "use strict";
  var isLoading = ko.observable(true)
    , _baraja
    , $lastElement;

  var barajaPrev = function() {
    _baraja.previous();
  };

  var barajaNext = function() {
    _baraja.next();
  };

  var seleccionarBaraja = function() {
      
    if ($lastElement === undefined && _baraja.closed === true) {
      _baraja.fan();
      return;
    } 

    if (parseInt($lastElement.data('level')) === 0) {
      _baraja.fan();
      return;
    }

    var level = parseInt($lastElement.data('level'));
    var target = $lastElement.data('target');
    var owner = $lastElement.data('owner');

    var uri = '/';
    if (level === 1) {
      var uri = '/bloques/' + level + '/' + target;
    } else {
      var uri = '/tangibles/' + owner + '/' + target;  
    }

    window.location.href = uri;
  };

  function itemClick(item, event) {
    var $t = $(event.target);
    if (_baraja.closed === true) {
      return;
    }

    if ($t.context.localName !== 'li') {
      $lastElement = $t.parent('li');
      return false;
    };

    $lastElement = $t;
    return false;
  }

  // create the context
	var vm = {
		isLoading: isLoading,
    barajaPrev: barajaPrev,
    barajaNext: barajaNext,
    seleccionarBaraja: seleccionarBaraja,
    itemClick: itemClick
	};

	ko.applyBindings(vm);

  $.when(init())
   .then(function(){ 
      isLoading(false);
    });

	return vm;

  function init() {
    return $.Deferred(function(def){

      $(function(){
        // when de DOM is loaded
        _baraja = $('#baraja-el').baraja();
        _baraja.fanSettings.range = 180;
        def.resolve();
      });

    }).promise();
  }

}(jQuery, ko, _, window);

