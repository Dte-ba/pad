
'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var config = require('../../config/environment');

var manager = {};
var _areas;

var client = config.env === 'production' ? 'public' : 'client';
var imgFolder = path.join(config.root, client);
var defaultImg = '/assets/img/areas/portada.png';
var rootUrl = '/assets/img/areas/';

var getAreas = function(force, cb){
  
  if (typeof force === 'function'){
    cb = force;
    force = false;
  }

  /*if (_areas !== undefined && !force){
    return cb && cb(null, _areas);
  }*/

  var filename = path.join(__dirname, 'areas.json');

  fs.exists(filename, function(exists){
    
    if (exists) {
      fs.readFile(filename, 'utf-8', function(err, content){
        if (err) { return cb && cb(err); }
        
        var areas = JSON.parse(content).areas;
        _areas = areas;
        cb && cb (null, areas);
      });
    } else {
      cb && cb(null, []);
    }

  });
};

// TODO: generate cache
var createStructure = function(force, cb){
  getAreas(force, function(err, areas){
    if (err){
      return cb && cb(err);
    }

    var res = areas.map(function(item){
      var a = {
        name: item.area,
        kebadCase: _.kebabCase(item.area).replace(/\-/ig, '_')
      };

      a.axis = item.axis.map(function(ax){
        var encodeAx = _.kebabCase(ax.name).replace(/\-/ig, '_');
        var relative = path.join(rootUrl, a.kebadCase, encodeAx, 'padnet.png');
        var full = path.join(imgFolder, relative);
        var img = fs.existsSync(full) ? relative.replace(/\\/ig, '/') : defaultImg;

        var rax = {
          name: ax.name,
          kebadCase: encodeAx,
          img: img,
          //fullpath: full
        };

        rax.blocks = ax.blocks.map(function(b){
          
          var encodeBlock = _.kebabCase(b).replace(/\-/ig, '_');
          var relativeb = path.join(rootUrl, a.kebadCase, rax.kebadCase, encodeBlock, 'portada.png');
          var fullb = path.join(imgFolder, relativeb);
          var imgb = fs.existsSync(fullb) ? relativeb.replace(/\\/ig, '/') : defaultImg;

          var rb = {
            name: b,
            kebadCase: encodeBlock,
            img: imgb,
            fullpath: fullb,
          };

          return rb;
        });

        return rax;
      });

      return a;

    });

    cb && cb(null, res);
  });
};

manager.areas = function(force, cb){
  createStructure(force, cb);
};

module.exports = manager;