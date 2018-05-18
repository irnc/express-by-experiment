'use strict';

const express = require('express');
const app = express();

/*

Previously I thought that I could throw from express middleware, both sync and
async. It is true only for sync middleware.

review https://github.com/expressjs/express/issues/2259
I guess I was wrong, so need to research it
https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
https://github.com/expressjs/express/issues/3518

*/

app.get('/sync', (req, res) => {
  throw new Error('thrown from sync middleware');
});

app.get('/next-tick', (req, res) => {
  process.nextTick(() => {
    // Would cause process exit with exit code set to 1.
    throw new Error('thrown from next-tick middleware');
  });
});

app.get('/async', async (req, res) => {
  // throw from async middleware causes `UnhandledPromiseRejectionWarning` and
  // `[DEP0018] DeprecationWarning`.
  throw new Error('thrown from async middleware');
});

app.use((err, req, res, next) => {
  res.json({
    // stringified `err` would be empty object for some reason
    // TODO find out why
    // https://github.com/irnc/json-by-experiment/blob/master/test.js
    err,
    message: err.message,
  });
});

module.exports = app;
