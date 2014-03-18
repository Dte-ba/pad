var fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , repo = require('pad-repository')
  , wordsUtils = repo.wordsUtils
  ;

var regLib = {
  uri: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  http: /^https?:\/\//
}

/*
 * GET index page.
 */

exports.index = function(req, res){
  var filter = req.query.filter;
  filter = filter === undefined ? '' : filter;
  res.render('panel', { title: 'Viewer', filter: filter } );
};

/*
 * GET packages.
 * 
 * /panel/packages/:filter?take=N?skip=N
 */
exports.packages = function(req, res){
  var filter = req.params.filter
    , take = req.query.take
    , skip = req.query.skip;

  var _repo = new repo.Repository('./repo');

  var flags = loadFlags();

  _repo.getPackages({}, function(err, data){

    // refresh data
    data.forEach(function(pkg){
      if (flags[pkg.uid] == undefined) {
        flags[pkg.uid] = 0;
      }
      saveFlags(flags);
    });

    var bigTotal  = data.length;

    if (filter !== undefined && filter !== '') {
      var srch = wordsUtils.regexEscape(
            wordsUtils.escape(filter.toLowerCase())
      );
      data = data.filter(function(item){
        return itemMatch(item, srch);
      });
    }

    var total  = data.length;

    take = take === undefined ? total : parseInt(take);
    skip = skip === undefined ? 0 : parseInt(skip);

    data = paginate(data, take, skip);
    
    // map flags
    data = data.map(function(pkg){
      pkg.status = flags[pkg.uid];
      pkg.statusClass = getStatusClass(pkg.status);
      return pkg;
    });

    res.charset = 'utf-8';
    res.writeHead(200, {'Content-Type': 'application/json'});

    res.end(JSON.stringify({ 
      results: data,
      total: total,
      bigTotal: bigTotal
    }));

  });

};

/*
 * GET package.
 * 
 * /panel/package/:uid
 */
exports.package = function(req, res){
  var uid = req.params.uid;

  var _repo = new repo.Repository(path.resolve('./repo'));

  var flags = loadFlags();

  _repo.getContent(uid, 'metadata', function(err, data){

    if (flags[data.uid] == undefined) {
        flags[data.uid] = 0;
    }

    saveFlags(flags);

    data.status = flags[data.uid];
    data.statusClass = getStatusClass(data.status);

    if (regLib.uri.test(data.content.source) !== -1) {
      data.content.sourceHref = data.content.source;

      if (regLib.http.test(data.content.source) !== 0) {
        data.content.sourceHref = 'http://' + data.content.sourceHref;
      }
     
    }

    data.content.tagsSplis = wordsUtils.splitTags(data.content.tags);

    res.render('panel/package', { tangible: data } );
  });

};

/*
 * GET clean.
 * 
 * /panel/clean
 */
exports.cleanCache = function(req, res){
  
  res.render('panel/clean-cache', {  } );

};

/*
 * POST restore.
 * 
 * /panel/restore
 */
exports.restoreCache = function(req, res){
    
    var _repo = new repo.Repository(path.resolve('./repo'));

    _repo.restore(function(err){

      if (err) {
         console.error('Error inesperado', err);
         res.send(500, 'Error inesperado');
        return;
      }

      res.status(200);
      res.send('Cache restaurado');
      console.log('ready!');
    });

};

/*
 * POST package.
 * 
 * /panel/package/status/:uid/:status
 */
exports.packageStatus = function(req, res){
  var uid = req.params.uid
    , status = req.params.status;

  var _repo = new repo.Repository('./repo');

  var flags = loadFlags();

  flags[uid] = parseInt(status);

  saveFlags(flags);

  res.charset = 'utf-8';
  res.writeHead(200, {'Content-Type': 'application/json'});

  res.end(JSON.stringify({ status: status }));

};

//
// private functions

function itemMatch(item, srch) {
    
    if (srch == '') return true;

    var ct = item.content;

    if (wordsUtils.escape(item.uid).search(srch) !== -1) return true;

    if (wordsUtils.escape(ct.title).search(srch) !== -1) return true;

    if (wordsUtils.escape(ct.area).search(srch) !== -1) return true;
                
    if (wordsUtils.escape(ct.axis).search(srch) !== -1) return true;
    
    if (wordsUtils.escape(ct.block).search(srch) !== -1) return true;

    var ta = _.any(ct.tags, function(t) {
      return wordsUtils.escape(t).search(srch) !== -1;
    });

    return ta;
}

function paginate(collection, take, skip) {

  collection = _.rest(collection, skip);
  collection = _.first(collection, take);

  return collection; 
}

var dataFlagFile = './data/flags.json';

function loadFlags() {
  if (!fs.existsSync(dataFlagFile)) {
    saveFlags({});
  }

  var json = fs.readFileSync(dataFlagFile, 'utf-8');

  return JSON.parse(json);
}

function saveFlags(data) {

  fs.writeFileSync(dataFlagFile, JSON.stringify(data));
}

function getStatusClass(status) {

  switch(status) {
    case 1: return 'icon-ok';
    case 2: return 'icon-retweet';
    case 3: return 'icon-warning-sign';
    default: return undefined;
  }
}