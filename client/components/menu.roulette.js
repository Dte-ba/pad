;
/*
 * Utils
 */

(function($, window, document, undefined){
  'use strict';
  
  var Math = window.Math;

  Math.convertDegs = function(type, num){
    if (type == "rads") {
      return num*180/Math.PI;
    }

    if (type == "degs") {
      return num*Math.PI/180;
    }
  };

  $.fn.rotation = function(degs){

    if (degs === undefined) {
      var f = this.first();
      var elem  = $(f);
      
      var matrix = elem.css("-webkit-transform") ||
      elem.css("-moz-transform")    ||
      elem.css("-ms-transform")     ||
      elem.css("-o-transform")      ||
      elem.css("transform");

      if(matrix !== 'none') {
          var values = matrix.split('(')[1].split(')')[0].split(',');
          var a = values[0];
          var b = values[1];
          var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      } else { 
        var angle = 0; 
      }

      if (angle < 0) {
        angle +=360;
      }

      return angle;
    }

    return this.each(function(){
      var elem  = $(this);
      elem.css({
          '-webkit-transform': 'rotate('+degs+'deg)',
          '-moz-transform': 'rotate('+degs+'deg)',
          '-ms-transform': 'rotate('+degs+'deg)',
          '-o-transform': 'rotate('+degs+'deg)',
          'transform': 'rotate('+degs+'deg)'
      });
    });

  };

})(jQuery, window, document);

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
              { duration: 400 + (count++ * 15) }
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

      var dif = parseFloat(A360/7);

      var angulo = initAngle + (dif*h) - Math.PI / 2;
      
      var y = Math.round(radio*Math.sin(angulo));
      var x = Math.round(radio*Math.cos(angulo));

      var rm = Math.floor(Math.random() * 250) + 30;

      elem
        .stop()
        .css({  'top': (w/2) + 'px', 'left': (w/2) + 'px' })
        .animate({  
            'top': y + radio, 
            'left': x + radio 
          },
          {
            duration: 150 + (rm)
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