'use strict';

var manager = require('../epm-manager');

module.exports =  function(req, res, next){
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

};