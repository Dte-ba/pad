'use strict';

var manager = require('../epm-manager');

var async = require('async');
var _ = require('lodash');

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
      
      async
        .waterfall([
          
          // find files
          function(cb){
            repo.db.files.find({}, cb);
          },
          //find packages
          function(files, cb){
            repo
              .find({}, function(err, packages){
                if (err) { return cb(err); }

                packages = _.map(packages, function(item){
                  var file = _.findLast(files, function(f){
                    return f.filename === item.filename;
                  });
                  item.size = 0;
                  if (file !== undefined){
                    item.size = file.stats.size;
                  }
                  //console.log(item.size);
                  return {
                    uid: item.uid,
                    area: item.content.area,
                    axis: item.content.axis,
                    block: item.content.block,
                    size: item.size
                  };
                });

                cb(null, packages)
                
              });
          },

          ], function(err, packages){
            if (err) {
              return next(err);
            }
            res.json(packages);
          })
      
    });

};