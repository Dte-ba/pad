// /explorar
module.exports = arbor;

function arbor(req, res){
  var match = req.params.match;

  res.render('arbor' );
}