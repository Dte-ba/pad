'use strict';

var path = require('path');
var mime = require('mime');

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
        var fname = pkg.filename;
        fname = encodeURIComponent(fname);
        res.setHeader('Content-disposition', 'inline; filename="' + fname + '"');
        res.setHeader('Content-Type', mime.lookup(pkg.filename));

        res.sendFile(repo.resolve(pkg.filename));
      });
    });

};