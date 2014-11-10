;
// common js for each pages

(function($, io, ko, window, document, undefined){
  "use strict";

  var isLoadaded = false;

  var loadedComplete = function(){
    for (var i = 0; i < window.__listeners.length; i++) {
      var func = window.__listeners[i];

      func.apply(window);
    };
  };

  window.__listeners = [];
  window.onLoaded = function(func){
    window.__listeners.push(func);
    if (isLoadaded) {
      loadedComplete();   
    }
  };

  var socket = io();

  $(function(){
    $(document).ready(function(){

      socket.on('status', function(info){
        if (info.status === "complete") {
          $('body').removeClass('loading');
          isLoadaded = true;
          loadedComplete();
        }
      });

      socket.on('users change', function(usersOnline){
        console.log('usersOnline: ' + usersOnline);
        $('.users-online').text('online: ' + usersOnline);
      });
      

      $(document).click(function(){
        if ($('#aside-menu').hasClass('active')) {
          $('#aside-menu').removeClass('active');
        }
      });

      //$('#aside-menu ul li a').tooltip();
      $('a[data-toggle="tooltip"]').tooltip();

      $('#aside-menu').click(function(e){
        $('#aside-menu').toggleClass('active');
        event.stopPropagation();
      });

    });
  });
  
})(jQuery, io, ko, window, document)