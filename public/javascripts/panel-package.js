/**
 * The stats page of PAD
 */
!function($, ko, _, window, undefined){
  "use strict";
  
  function vistoBuenoHandler() {
    if ($('#btn_vb').hasClass('active') || $('#btn_vb').hasClass('disabled')) {
      return;
    }
    setStatus(1);
  }

  function reempaquetarHandler() {
    if ($('#btn_r').hasClass('active') || $('#btn_r').hasClass('disabled')) {
      return;
    }
    setStatus(2);
  }

  function errorHandler() {
    if ($('#btn_e').hasClass('active') || $('#btn_e').hasClass('disabled')) {
      return;
    }
    setStatus(3);
  }

  function setStatus(status) {
    var uid = $('#actions').data('uid'); 
    var uri = '/panel/package/status/' + uid + '/' + status;
    
    $('#btn_vb').addClass('disabled');
    $('#btn_r').addClass('disabled');
    $('#btn_e').addClass('disabled');

    $.get(uri, function(data){
      realoadStatus(parseInt(data.status));
    });

  }

  function realoadStatus(status) {
    $('#btn_vb').addClass('disabled');
    $('#btn_r').addClass('disabled');
    $('#btn_e').addClass('disabled');
    $('#iconStatus').attr('class', '');

    switch(status) {
      case 1:
          $('#btn_vb').addClass('active');
          $('#btn_vb').removeClass('disabled');
          $('#iconStatus').attr('class', 'icon-ok');
        break;
      case 2: 
          $('#btn_r').addClass('active');
          $('#btn_r').removeClass('disabled');
          $('#iconStatus').attr('class', 'icon-retweet');
        break;
      case 3: 
          $('#btn_e').addClass('active');
          $('#btn_e').removeClass('disabled');
          $('#iconStatus').attr('class', 'icon-warning-sign');
        break;
      default: 
          $('#btn_vb').removeClass('disabled');
          $('#btn_r').removeClass('disabled');
          $('#btn_e').removeClass('disabled');
          $('#btn_vb').removeClass('active');
          $('#btn_r').removeClass('active');
          $('#btn_e').removeClass('active');
        break;
    }
  }

  $(function(){
    var status = $('#actions').data('status'); 

    if (status !== undefined && status !== '') {
      realoadStatus(status);
    }

  });

  var vm = {
    vistoBuenoHandler: vistoBuenoHandler,
    reempaquetarHandler: reempaquetarHandler,
    errorHandler: errorHandler
  };

  ko.applyBindings(vm);

}(jQuery, ko, _, window);

