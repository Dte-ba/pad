!function($, ko, _, window, undefined){

  function restore() {
    vm.loading(true);
    vm.restored(false);

    $.ajax({
      type: "POST",
      url: "/panel/restore"
    })
    .done(function( msg ) {
      console.log('ready!');
      vm.loading(false);
      vm.restored(true);
    })
    .error(function(err){
      vm.loading(false);
    });
    
  };

  var vm = {
    loading: ko.observable(false),
    restore: restore,
    restored: ko.observable(false)
  };

  ko.applyBindings(vm);

}(jQuery, ko, _, window)