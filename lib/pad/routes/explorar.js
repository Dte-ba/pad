var wordsUtils = require('epm').wordsUtils;
var _ = require('underscore');

// /explorar
module.exports = explorar;

function explorar(req, res){
  var area = req.query.area;
  var axis = req.query.axis;
  var block = req.query.block;
  var tag = req.query.tag;

  var query = parseCommands(req);
  var repo = process.REPOSITORY;

  repo.packages.execQuery(query, function(err, data){ 
  
    if (err) return next(err);

    var tags = _.union.apply(
        _, 
        data.map(function(p){ 
          
          return wordsUtils.splitTags(p.content.tags); 

        })
      );

    // clear emties
    tags = tags.filter(function(t){
      return t.trim() !== '';
    })

    require('fs').writeFileSync('./tags.log', JSON.stringify(tags, null, 2));

    res.render('cloud', { words: tags });

  });

}

function parseCommands(req){
  var area = req.query.area;
  var axis = req.query.axis;
  var block = req.query.block;
  var tag = req.query.tag;

  var query = "select ";

  if (area !== undefined){
    query += "area:" + area
  }

  if (axis !== undefined){
    if (query !== "select "){
      query += " &&"
    }
    query += " axis:" + axis
  }

  if (block !== undefined){
    if (query !== "select "){
      query += " &&"
    }
    query += " block:" + block
  }

  if (tag !== undefined){
    if (query !== "select "){
      query += " &&"
    }
    query += " tag:" + tag
  }

  if (query === "select "){
    return "all";
  }

  return query;
}