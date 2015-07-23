'use strict';

var Epm = require('epm');
var path = require('path');
var mime = require('mime');
var _ = require('lodash');
var fs  = require('fs');
var express = require('express');
var serveIndex = require('serve-index')

var manager = require('../epm-manager');

var transformQuery = function(part){

  if (_.isArray(part)){
    var a = [];
    part.forEach(function(p){
      a.push(transformQuery(p))
    });
    return a;
  }

  var q = {};

  _.forIn(part, function(value, key) {

    if (_.isObject(value) || _.isArray(value)) {
      q[key] = transformQuery(value);
    } else if (key === '$regex') {
      q[key] = new RegExp(value, 'ig');
    } else {
      q[key] = value;
    }

  });

  return q;
};

module.exports = function(){

  var router = express.Router();
  router.cacheContent = {};

  /*router.get('/repository/:reponame', function(req, res, next){
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

  });*/

  router.post('/query/:repository', function(req, res, next){
    var rname = req.params.repository;

    manager
      .get(rname)
      .progress(function(info){

      })
      .fail(function(err){
        next(err);
      })
      .done(function(repo){
        var q = transformQuery(req.body);

        repo
        .find(q, function(err, items){
          if (err) {
            return next(err);
          }
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

    manager
      .get(rname)
      .progress(function(info){

      })
      .fail(function(err){
        next(err);
      })
      .done(function(repo){
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

              res.sendFile(filename);
            });

          });
      });

  });

  router.get('/metadata/:repository/:uid', function(req, res, next){
    var rname = req.params.repository;
    var uid = req.params.uid;
    
    manager
      .get(rname)
      .progress(function(info){

      })
      .fail(function(err){
        next(err);
      })
      .done(function(repo){

        repo
        .findOne({uid: uid}, function(err, pkg){
          if (err) {
            return next(err);
          }
          res.json(pkg);
        });
      });

  });

  router.get('/content/:repository/:uid', function(req, res, next){
    var rname = req.params.repository;
    var uid = req.params.uid;

    manager
      .get(rname)
      .progress(function(info){

      })
      .fail(function(err){
        next(err);
      })
      .done(function(repo){

        repo
        .findOne({uid: uid}, function(err, pkg){
          if (err) {
            return next(err);
          }
          var info = {
              uid: uid,
              build: pkg.build || 1,
              filename: pkg.filename    
            };

            repo.engine.content(repo, info, pkg, function(err, data){
              if (err) { return next(err); }

              var files = data.map(function(f){ 
                if (process.platform !== 'win32') {
                  f = f.replace('\\', '/');
                } else {
                  f = f.replace('/', '\\');
                }

                return {
                  filename: f,
                  stats: fs.statSync(path.resolve(f))
                }
              });

              var thefiles = {
                uid: uid,
                type: 'files',
                files: files
              };

              writeResolved(thefiles, res, rname);
            });
        });
      });

  });

  router.get('/files/:repository/:uid', function(req, res, next){
    var rname = req.params.repository;
    var uid = req.params.uid;

    var route = '/files/' + rname + '/' + uid;

    var p = router.cacheContent[route];
    
    if (p === undefined) {
      return res.redirect('/epm/content/' + rname + '/' + uid);
    }

    req.url = req.url.replace(route, '/');

    var dfn = serveIndex(p.path, {'icons': true});
    
    //router.use(route, serveIndex(p.path, {'icons': true}));

    //res.redirect('/epm/' + route);
    //console.log(p.path);
    dfn.apply(router, [req, res, next]);
    //next('route');
  });

  return router;

  function writeError(error, res, statusCode){
    statusCode = statusCode || 500;
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    return res.json(error);
  }

  /**
   * Write epm-pad-engine resutls
   */
  function writeResolved(info, res, rname, statusCode){
    statusCode = statusCode || 200;
    if (info.files.length === 1){
      //res.setHeader('Content-Type', mime.lookup( info.files[0].filename) );
      sendFile(res, info.files[0].filename);
      return true;
    } else {
      var bpath = extractBasepath(info.files.map(function(f){ return f.filename; }));

      var relfiles = info.files.map(function(f){
        var fname = f.filename.replace(/\\/ig, '/');
        return fname.replace(bpath, '');
      });

      var htmls = relfiles.filter(function(rf){
        return (/\.html$/i).test(rf);
      });

      // the index HTML
      var ihtml = htmls.filter(function(h){ 
        return /index.htm(l)?/ig.test(h);
      });

      var idxhtml = ihtml.length > 0 ? ihtml[0] : undefined;

      if ( idxhtml === undefined){
        // index.html doesn't exists 
        // any html
        idxhtml = (htmls.length > 0 ? htmls[0] : undefined);
      }

      var route = '/files/' + rname + '/' + info.uid;
      if (router.cacheContent[route] === undefined){
        router.cacheContent[route] = {
          path: bpath,
          index: idxhtml
        };
      }
      var r = route;
      var item = router.cacheContent[route];
      if (item.index !== undefined){
        r += '/' + item.index;
      }
      
      res.redirect('/epm' + r);
      //res.sendFile(idxhtml, {root: bpath });
    }

    function sendFile(res, filename){
      var fname = path.basename(filename);
      fname = encodeURIComponent(fname);
      res.setHeader('Content-disposition', 'inline; filename="' + fname + '"');
      res.setHeader('Content-Type', mime.lookup(filename));

      res.download(filename);
    }

    function extractBasepath(entries) {

      var dirs = entries.map(function(e){ 
        return path.dirname(e); 
      });

      var sdirs = dirs.map(function(d){ 
        return d.split('\\');
      });

      var idx = 0;
      var curr;
      var root = '';
      var eq;

      var haveFunc = function(sd){ 
        return sd.length > idx; 
      };

      var eqFunc = function(i){
        return curr === i;
      };

      var eqmapFunc = function(a){ 
        return a[idx]; 
      };

      do {

        curr = sdirs[0][idx];

        var have = _.all(sdirs, haveFunc);

        eq = have;
        if (have === true){
          eq = _.all(sdirs.map(eqmapFunc), eqFunc);
        }

        if(eq) {
          root += curr + '/';
        }

        idx++;

      } while(eq === true);

      return root;
    }
  }
};