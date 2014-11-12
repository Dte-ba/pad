process.env.NODE_ENV = 'production';
process.env.PORT = 8000;

var app = require('./app.js')({ port: 8000 });