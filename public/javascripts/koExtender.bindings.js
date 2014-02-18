(function($, ko) {
  "use strict";

   ko.bindingHandlers['baraja'] = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var options = allBindingsAccessor().barajaOptions || {};
      var value = ko.unwrap(valueAccessor());

      $el = $(element);
      
      if (value != undefined && ( value instanceof Array )) {
        var lis='';
        for(var i=0; i<value.length;i++) {
          var item = value[i];

              lis += '<li>';
              lis += ' <img src="' + item.src + '" alt="' + item.alt + '"/>';
              lis += ' <h4>' + item.title + '</h4>';
              lis += '</li>';

        }
        
        $el.html(lis);
      }

      var b = $el.baraja();
    },
    'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var options = allBindingsAccessor().barajaOptions || {};
      var value = ko.unwrap(valueAccessor());

    }
  };

  ko.bindingHandlers['tagcloud'] = {
    'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.unwrap(valueAccessor());

        $el = $(element);
        
        if (value != undefined && ( value instanceof Array )) {
        var a='';

        for(var i=0; i<value.length;i++) {
          var item = value[i];

          a += '<a href="#" rel="' + item.weight + '">' + item.text + '</a>';
          
        }

        $el.html(a);
        $(element).children('a').tagcloud();
      }
    }

  };

})(jQuery, ko);