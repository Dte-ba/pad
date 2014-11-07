module.exports = filter;

function filter(req, res){
  var filter = req.body.filter;

  var query = "";

  if (filter !== undefined){
    query = filter;
  }

  if (query === ""){
    var vm = {
      tangibles: [],
      isError: false
    }

    res.render('filter', vm);
    return ;
  }

  var repo = process.REPOSITORY;

  repo.packages.execQuery(query, function(err, data){

    var vm = {
      filter: filter
    };

    if (err){
      vm.error = err;
      vm.isError = true;
    }

    if (data === undefined || data.length === 0) {
      vm.isEmpty = true;
    } else {
      vm.tangibles = data;
    }
   
    res.render('filter', vm);

  });

};