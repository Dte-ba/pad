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

  function convert(type, num) {
    if (type == "rads") {
      return num*180/Math.PI;
    }

    if (type == "degs") {
      result = num*Math.PI/180;
    }
  }

  $.fn.roulette = function(opciones){

    var setPosicion = function(elem, h, radio, initAngle, count){
      count = count || 0;
      initAngle = initAngle || 0;
      // definicion del angulo 360 en Radianes
      var A360 = parseFloat(2*Math.PI);

      var dif = parseFloat(A360/12);

      var angulo = initAngle + (dif*h) - Math.PI / 2;
      
      var y = Math.round(radio*Math.sin(angulo));
      var x = Math.round(radio*Math.cos(angulo));

      elem.css({  'top': '150px', 'left': '150px' });
      elem.animate(
        {  'top': y + radio, 'left': x + radio },
        {
          duration: 150 + (count*15)
        });
    };

    // Extendemos las opciones por default
    var opts = $.extend( {}, $.fn.roulette.defaults, opciones );
    
    var count = 0;
    var radio = (opts.anchoAlto / 2);

    return this.each(function(){

      var elem  = $(this);

      elem
        .children('ul.roulette')
        .children('li')
        .each(function(){
          var $l = $(this);
          setPosicion($l, count++, radio, opts.initAngle, count);
      });
      
    });

  };

  $.fn.roulette.defaults = {
    anchoAlto: 300,
    posicion: 'middle center',
    initAngle: 0
  };

})(jQuery, window);