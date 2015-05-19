
var filter = require('../filter.js');

// GET /explorar
module.exports = tangibles;

var _areas = require('./areas-alias.js');

var matches = _areas.matches;
var alias = _areas.alias;


function tangibles(req, res){
  var query = parseCommands(req);
  var repo = process.REPOSITORY;

  var area = req.query.area;
  area = matches[area];
  if (area === undefined || area === null){
    throw new Error('The area `s%` is not a valid', req.query.area)
  }
  var axis = req.query.axis;
  var block = req.query.block;
  var tag = req.query.tag;

  var bc = 'area-' + alias[area];

  repo.packages.execQuery("all", function(err, data){
    
    if (err) return next(err);

    
    var filtered = filter.filter(data, area, axis, block, tag);
        
    if (area === undefined && axis === undefined && block === undefined && tag !== undefined){
      filtered = filter.forTag(data, tag);      
    }

    filtered.forEach(function(t){
      var a = alias[t.content.area];
      t.bg = 'bg-' + a;
    });

    var vm = {
      tangibles: filtered,
      toExplore: req._parsedUrl.search,
      isEmpty: filtered.length === 0
    };
   
    res.render('tangibles', vm);
  });
}

function parseCommands(req){
  var area = req.query.area;
  var axis = req.query.axis;
  var block = req.query.block;
  var tag = req.query.tag;

  var query = "";

  if (area !== undefined){
    query += "area:" + area
  }

  if (axis !== undefined){
    if (query !== ""){
      query += " &&"
    }
    query += " axis:" + axis
  }

  if (block !== undefined){
    if (query !== ""){
      query += " &&"
    }
    query += " block:" + block
  }

  if (tag !== undefined){
    if (query !== ""){
      query += " &&"
    }
    query += " tag:" + tag
  }

  query = "select " + query;
  return query;
}