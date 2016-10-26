var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/req.headers', function (req, res) {
  res.json(req.headers);
});

module.exports = app;
