(function() {
  module.exports = function(app) {
    app.get('/panel', function(req, res) {
      return res.render('panel.ejs', {
        layout: null
      });
    });
    app.get('/panel/repos', function(req, res) {
      var repos;
      repos = app.repositories != null ? Object.keys(app.repositories) : [];
      return res.json(repos);
    });
    app.get('/panel/packages/:name', function(req, res, next) {
      var instance, name, r;
      name = req.params.name;
      if (app.repositories) {
        r = app.repositories[name];
      } else {
        return next(new Error("No repositories loaded"));
      }
      if (!r) {
        return next(new Error("Invalid repo name " + r));
      }
      instance = r.instance;
      instance.on('error', function(er) {
        return next(err);
      }).once('ready', function() {
        return instance.packages.execQuery('all', function(err, data) {
          if (err) {
            return next(err);
          }
          return res.json(data);
        });
      });
      return instance.read(false);
    });
    app;
    return app.get('/panel/ipaddress', function(req, res, next) {
      var ip;
      ip = require('ip');
      return res.json({
        ipaddress: ip.address(),
        port: 3220
      });
    });
  };

}).call(this);
