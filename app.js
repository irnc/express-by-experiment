'use strict';

var express = require('express');
const throwApp = require('./throw-app/throw-app')
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/req.headers', function (req, res) {
  res.json(req.headers);
});

app.use('/throw', throwApp);

module.exports = app;
