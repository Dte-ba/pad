
// /tangible/:uid
module.exports = tangible;

function tangible(req, res){

  var uid = req.params.uid;

  var query = "select uid:" + uid;

  var repo = process.REPOSITORY;

  repo.packages.execQuery(query, function(err, data){

    var vm = {};
    vm.toExplore = req._parsedUrl.search;

    if (data.length === 0) {
      vm.isEmpty = true;
    } else {
      vm.tangible = data[0];
    }
   
    res.render('tangible', vm );

  });
 
};