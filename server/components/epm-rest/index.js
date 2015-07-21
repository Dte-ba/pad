/*!
 * This file is part of EPM.
 *
 * please see the LICENSE
 */

var Epm = require('epm');
var path = require('path');
var fs  = require('fs');
var express = require('express');

var _repos = {};

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

  router.post('/query/:repository', function(req, res, next){
    var rname = req.params.repository;

    getRepository(rname, function(err, repo){
      if (err) return next(err);

      repo
        .find(req.body, function(err, items){
          res.json(items);
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
      if (err) {
        console.log(err);
        return next(err)
      }
      //res.json('');
      repo
        .findOne({uid: uid}, function(err, pkg){

          if (err){
            console.log(err);
          }
          var info = {
            uid: uid,
            build: pkg.build || 1,
            filename: pkg.filename    
          };

          repo.engine.asset(repo, info, pkg, name, function(err, filename){
            if (err) { return next(err); }

            var options = {
              root: path.dirname(filename),
              dotfiles: 'deny',
              headers: {
                  'x-timestamp': Date.now(),
                  'x-sent': true
              }
            };

            res.sendfile(filename);
          });

        });
    });

  });

  return router;

  function getRepository(name, cb){
    if (_repos[name] !== undefined){
      //console.log(name + ' exists');
      return cb && cb(null, _repos[name]);
    }
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
      var repo = _repos[name]  = new Epm(info.path);
      console.log(name + ' loading...');
      repo
        .load(true)
        .done(function(){
          cb(null, repo);
          console.log(repo.REPONAME + ' loaded');
        });
      
    });
  }
};