
var _areas = require('./areas-alias.js');

var matches = _areas.matches;
var alias = _areas.alias;

// /tangible/:uid
module.exports = tangible;

function tangible(req, res){

  var uid = req.params.uid;

  var query = "select uid:" + uid;

  var repo = process.REPOSITORY;

  repo.packages.execQuery(query, function(err, data){
    var tangible = data[0];

    var area = tangible.content.area;
    area = matches[area];
    var bc = 'area-' + alias[area];

    var vm = {};
    vm.toExplore = req._parsedUrl.search;
    vm.areaClass = bc;
    vm.area = alias[area];
    vm.areaText = area;
    vm.axis = tangible.content.axis;
    vm.bloque = tangible.content.block;

    if (data.length === 0) {
      vm.isEmpty = true;
    } else {
      vm.tangible = tangible;
      vm.tangible.tags = tangible.content.tags.split(',');
    }
   
    res.render('tangible', vm );

  });
 
};