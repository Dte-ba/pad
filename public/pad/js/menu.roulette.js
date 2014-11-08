/*!
 * 
 * Menu Roulette - PAD
 *
 * Copyright (c) 2014 - Dirección de Tecnología Educativa
 * Licencia GPL v3 http://www.gnu.org/licenses/gpl-3.0.html
 */

(function($, window, undefined){
  'use strict';

  // Librería global de Matemática
  var Math = window.Math;

  var Menu = function(elem, opciones) {
    var self = this;
    
    var opts = $.extend( {}, $.fn.roulette.defaults, opciones );

    var w = elem.width();
    
    self.opened = false;

    self.show = function( degs ){
      var count = 0;
      var radio = (w / 2);

      elem
        .children('ul.roulette')
        .children('li')
        .each(function(){
          var $l = $(this);
          $l._roulettePosition(count++, radio, degs);
      });

      // TODO: warning
      self.opened = true;
    };

    self.hide = function(){
      elem
        .children('ul.roulette')
        .children('li')
        .each(function(){
          var count = 0;
          var $l = $(this);
          $l
            .stop()
            .animate(
              {  'top': (w/2) + 'px', 'left': (w/2) + 'px' },
              { duration: 200 + (count++ * 15) }
            );
      });
      // TODO: warning
      self.opened = false;
    };

    self.toggle = function(degs){
      if (self.opened === true) {
        self.hide();
      } else {
        self.show(degs);
      }
    };

    //init 
    elem
      .children('ul.roulette')
      .children('li')
      .each(function(){
        var count = 0;
        var $l = $(this);
        $l
          .stop()
          .css({  'top': (w/2) + 'px', 'left': (w/2) + 'px' })
        });
    return self;
  };

  $.fn._roulettePosition = function(h, radio, initAngle, w, cb){
    return this.each(function(){
      var elem  = $(this);
      
      initAngle = initAngle || 0;

      // definicion del angulo 360 en Radianes
      var A360 = parseFloat(2*Math.PI);

      var dif = parseFloat(A360/12);

      var angulo = initAngle + (dif*h) - Math.PI / 2;
      
      var y = Math.round(radio*Math.sin(angulo));
      var x = Math.round(radio*Math.cos(angulo));

      elem
        .stop()
        .css({  'top': (w/2) + 'px', 'left': (w/2) + 'px' })
        .animate({  
            'top': y + radio, 
            'left': x + radio 
          },
          {
            duration: 150 + (h*15)
        }, cb);

    });
  };

  $.fn.roulette = function(opciones){
    
    var elem  = $(this).first();
    return new Menu(elem, opciones);

  };

  $.fn.roulette.defaults = {
    anchoAlto: 300,
    posicion: 'middle center',
    initAngle: 0
  };

})(jQuery, window);