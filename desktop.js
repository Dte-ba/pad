process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 8000;

var app = require('./app.js')({ port: process.env.PORT });