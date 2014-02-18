process.env.NODE_ENV = 'production';
process.env.PORT = 8000;

var http = require('http')
  , app = require('./app.js');

var server = app.createServer({ panelEnabled: false });

http.createServer(server).listen(server.get('port'), function(){
  console.log('PAD aplicaction listening on port ' + server.get('port'));
});