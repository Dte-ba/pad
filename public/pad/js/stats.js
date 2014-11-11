/**
 * The blocks page of PAD
 */
!function($, ko, _, Chart, window, undefined){
  "use strict";

  var vm = {
    targets: ko.observableArray([]),
    all: ko.observableArray([]),
    total: ko.observable(0)
  };

  var alias = {
    "Centros Educativos Complementarios": "CEC",
    "Educación Artística - Plástica": "Ed. Artística - Plástica",
    "Educación Artística - Música": "Ed. Artística - Música",
    "Educación Artística - Danza": "Ed. Artística - Danza",
    "Educación Artística - Teatro": "Ed. Artística - Teatro",
    "Equipos de Orientación Escolar":  "EOE"
  };

  var colors = {
    "CEC": "#ec7f24",
    "Centros Educativos Complementarios": "#ec7f24",
    "Ciencias Naturales": "#9ba23d",
    "Ciencias Sociales": "#761113",
    "Ed. Artística - Plástica": "#6bb144",
    "Ed. Artística - Música": "#ebbf1c",
    "Educación Artística - Música": "#ebbf1c",
    "Ed. Artística - Danza": "#ed1c24",
    "Ed. Artística - Teatro": "#c51d64",
    "Educación Física": "#00adef",
    "EOE": "#ec7f24",
    "Equipos de Orientación Escolar": "#ec7f24",
    "Inglés": "#41235f",
    "Matemática": "#21418a",
    "Prácticas del Lenguaje": "#004c33",
    "Temas Transversales": "#ec7f24"
  };

  function draw(data) {

    console.log(data);

    var areas = Object.keys(colors);
   
    var currents = _.map(data.areas, function(a){ return a.name; });

    var pieData = _.map(data.areas, function(a){
      return {
        caption: a.name,
        value: a.length,
        color: colors[a.name]
      }
    });
   
   var dif = _.difference(areas, currents);
   
   _.each(dif, function(a){
      pieData.push({
        caption: a,
        value: 0,
        color: colors[a]
      });
   });

   vm.targets(pieData);
   vm.all(data);
   vm.total(data.total);

   var myPie = new Chart($("#_chart")[0].getContext("2d")).Pie(pieData);
  }

  $(function(){

    $.post('/stats', function(data){
      draw(data);
    });

    ko.applyBindings(vm);

  });

}(jQuery, ko, _, Chart, window);