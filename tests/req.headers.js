var test = require('tape');
var request = require('supertest');
var app = require('../app');

test('GET /req.headers', function (t) {
  t.plan(3);

  request(app)
    .get('/req.headers')
    .set('X-Test', 'true')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'should respond without error');
      t.equal(res.body['x-test'], 'true', 'should respond with request headers');

      const headers = Object.keys(res.body);

      t.test('req.headers', (st) => {
        const lowercaseHeaders = headers.map(header => header.toLowerCase());

        st.plan(1);
        st.deepEqual(headers, lowercaseHeaders, 'should have lowercase keys');
      })
    });
});
