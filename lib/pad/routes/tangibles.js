
// GET /explorar
module.exports = tangibles;

function tangibles(req, res){
  var query = parseCommands(req);
  var repo = process.REPOSITORY;

  repo.packages.execQuery(query, function(err, data){
    
    if (err) return next(err);

    var vm = {
      tangibles: data,
      toExplore: req._parsedUrl.search,
      isEmpty: data.length === 0
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