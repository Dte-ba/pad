var _ = require('underscore');

// GET /explorar
module.exports = stats;

function stats(req, res){

    var repo = process.REPOSITORY;

    repo.packages.execQuery("", function(err, data){ 
      var st = parseStats(data);
      res.writeHead(200, { 'content-type': 'application/json' });

      res.end(JSON.stringify(st));
    });

}

function parseStats(pkgs) {
      var cts = pkgs.map(function(p){
        return p.content;
      });

      //console.log(cts);
      var res = [];

      var areas = _.groupBy(cts, 'area');
      
      // AREAS
      Object.keys(areas).forEach(function(a){

        var area = {
          name: a,
          axis: [],
          length: areas[a].length
        };

        var ct = areas[a];
        

        var axises = _.groupBy(ct, 'axis');

        // AXIS
        Object.keys(axises).forEach(function(ax){
          var axis = {
            name: ax,
            blocks: [],
            length: axises[ax].length
          };

          var ct = axises[ax];

          // BLOCKS
          var blockes = _.groupBy(ct, 'block');

          Object.keys(blockes).forEach(function(b) {
              var block = {
                name: b,
                length: blockes[b].length
              };

              axis.blocks.push(block);
          });

          area.axis.push(axis);
        });

        res.push(area);

      });

      return {
        total: Object.keys(pkgs).length,
        areas: res
      };
}