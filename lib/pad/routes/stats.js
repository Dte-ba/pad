var _ = require('underscore');

// GET /explorar
var stats = module.exports = {};

stats.post = function(req, res){

    var repo = process.REPOSITORY;

    repo.packages.execQuery("", function(err, data){ 
      var st = parseStats(data);
      //res.writeHead(200, { 'content-type': 'application/json' });

      res.json(st);
    });

};

stats.get = function(req, res) {
  res.render('stats');
};

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