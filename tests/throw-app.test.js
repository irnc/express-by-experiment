'use strict';

const test = require('tape');
const request = require('supertest');
const app = require('../app');

test('GET /throw/sync', function (t) {
  t.plan(2);

  request(app)
    .get('/throw/sync')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should respond without error');
      t.equal(res.body.message, 'thrown from sync middleware');
    });
});

test('GET /throw/next-tick', function (t) {
  t.plan(2);

  request(app)
    .get('/throw/next-tick')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should respond without error');
      t.equal(res.body.message, 'thrown from sync middleware');
    });
});

test('GET /throw/async', function (t) {
  t.plan(2);

  request(app)
    .get('/throw/async')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should respond without error');
      t.equal(res.body.message, 'thrown from async middleware');
    });
});
