/**
 * The blocks page of PAD
 */
!function($, ko, _, Chart, window, undefined){
  "use strict";

  var vm = {
    targets: ko.observableArray([]),
    all: ko.observableArray([])
  };

  var colors = {
    "Educación Artística": "#e04a43",
    "Inglés": "#7f2aff",
    "Ciencias Naturales": "#208040",
    "Educación Física": "#00a0b1",
    "Ciencias Sociales": "#716558",
    "Matemática": "#347bb1",
    "Prácticas del Lenguaje": "#f4911c"
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

   var myPie = new Chart($("#_chart")[0].getContext("2d")).Pie(pieData);
  }

  $(function(){

    $.get('/panel/stats?type=json', function(data){
      draw(data);
    });

    ko.applyBindings(vm);

  });

}(jQuery, ko, _, Chart, window);