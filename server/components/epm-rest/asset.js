'use strict';

var path = require('path');

var manager = require('../epm-manager');

module.exports =  function(req, res, next){

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

          repo
            .engine
            .asset(repo, info, pkg, name)
            .fail(function(err){
              next(err);
            })
            .done(function(filename){
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

};