(function() {
  module.exports = function(app) {
    app.get('/panel', function(req, res) {
      return res.render('index', {
        layout: null
      });
    });
    app.get('/panel/ipaddress', function(req, res, next) {
      var ip;
      ip = require('ip');
      return res.json({
        ipaddress: ip.address(),
        port: 3220
      });
    });
    return app;
  };

}).call(this);
