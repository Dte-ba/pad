/*!
 * This file is part of EPM.
 *
 * please see the LICENSE
 */

var Epm = require('epm');
var path = require('path');
var fs  = require('fs');
var express = require('express');

module.exports = function(ops){

  var dir = ops.path;
  var instances = ops.instances || {};

  var router = express.Router();

  router.get('/repository/:reponame', function(req, res, next){
    var rname = req.params.reponame;
    getRepository(rname, function(err, repo){
      if (err) return next(err);

      repo
        .get('info')
        .fail(function(err){
          if (err) return next(err);
        })
        .done(function(pkgs){
          //console.log(Object.keys(pkgs.packages));
          res.json(pkgs);
      });

    });

  });

  router.get('/query/:repository/:query', function(req, res, next){
    var rname = req.params.repository;
    var query = req.params.query;
    getRepository(rname, function(err, repo){
      if (err) return next(err);

      repo
        .get(query)
        .fail(function(err){
          if (err) return next(err);
        })
        .done(function(pkgs){
          //console.log(Object.keys(pkgs.packages));
          res.json(pkgs);
      });

    });

  });

  router.get('/asset/:repository/:uid/:type/:name', function(req, res, next){
    var rname = req.params.repository;
    var uid = req.params.uid;
    var asset = req.params.asset;
    var type = req.params.type;
    var name = req.params.name;

    getRepository(rname, function(err, repo){
      if (err) return next(err);

      repo
        .infoByUid(uid, function(err, meta){

          repo
            .get('select uid:'+uid)
            .fail(function(err){
              if (err) return next(err);
            })
            .done(function(p){
              var info = {
                uid: uid,
                build: meta.build || 1,
                filename: meta.filename    
              };

              var single = p.length >0 ? p[0] : {};

              repo.engine.asset(repo, info, single, name, function(err, filename){
                if (err) { return netx(err); }

                res.sendfile(filename);
                //var stats = fs.statSync(filename);
                //res.json({filename: filename, stats: stats});
              });
          });

        });
    });

  });

  return router;

  function getRepository(name, cb){
    Epm.finder.find(dir, function(err, repos){
      var list = repos.filter(function(r){
        return r.name === name;
      });
      
      if (list.length === 0) {
        return cb && cb(new Error('Unknown repository ' + name));
      }

      if (list.length > 1) {
        return cb && cb(new Error('Multiple matches for ' + name + ' in the repository list'));
      }

      var info = list[0];
      var repo = new Epm(info.path);
      repo.init();
      cb && cb(null, repo);
    });
  }
};