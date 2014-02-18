/**
 * The blocks page of PAD
 */
!function($, ko, _, window, undefined){
  "use strict";

  var Pager = function (ops) {
        var self = this;

        ops = ops || {};

        ops.initPage = ops.currentPage || 1;
        
        ops.currentPage = ops.currentPage || 1;
        ops.totalPages = ops.totalPages || 1;
        
        ops.itemsPerPage = ops.itemsPerPage || 25;
        ops.itemsCount = ops.itemsCount || 1;

        self.currentPage = ko.observable(ops.initPage);
        self.itemsPerPage = ko.observable(ops.itemsPerPage);
        
        self.totalPages = ko.observable();
        self.itemsCount = ko.observable();

        self.buttons = ko.observableArray([]);
        
        self.pageChangeHandler = ops.onPageChange || function (page) {
            console.log('no handler on pageChange', page);
        };
        
        self.itemsCount.subscribe(function(newValue) {

            var items = parseInt(newValue);
            var tp = Math.ceil(items / self.itemsPerPage());

            self.totalPages(tp || 1);


        }, self);

        self.buttons = ko.computed(function () {
            var res = [];

            for (var i = 1; i < self.totalPages() ; i++) {
                res.push({
                    number: i,
                    active: (i == self.currentPage()),
                    onClick: itemClick
                });
            }

            return res;
        });

        self.skipItems = ko.computed(function () {
            return (parseInt(self.currentPage()) - 1) * parseInt(self.itemsPerPage());
        });

        var changePage = function (page) {
            if (page == self.currentPage()) return;

            self.currentPage(page);

            self.pageChangeHandler(page);
        };

        var itemClick = function (data, event) {
            changePage(data.number);
            event.preventDefault(); return false;
        };

        return self;
  };

  var packages = ko.observableArray([])
    , filtro = ko.observable('').extend({ throttle: 500 })
    , isLoading = ko.observable(false)
    , showCounter = ko.observable(0)
    , totalCounter = ko.observable(0)
    ;

  function refresh() {
    isLoading(true);
    var skip = pager.skipItems();
    var take = pager.itemsPerPage();
    var uri = '/panel/packages/' + filtro() + '?take=' + take.toString() + '&skip=' + skip.toString();

    $.get(uri, function(data){
      packages(data.results);
      pager.itemsCount(data.total);
      showCounter(data.total);
      totalCounter(data.bigTotal);
      isLoading(false);
    });

  }

  filtro.subscribe(function(text){

    refresh();

  });

  var pager = new Pager({ onPageChange: refresh });

  var vm = {
    packages: packages,
    filtro: filtro,
    isLoading: isLoading,
    pager: pager,
    showCounter: showCounter,
    totalCounter: totalCounter
  };

  ko.applyBindings(vm);

  $(function(){

    var f = $('#txtFilter').data('filter');
    if (f !== '') {
      console.log(f);
      filtro(f);  
    } else {
      // for the first time
      refresh();
    }

  });

}(jQuery, ko, _, window);

