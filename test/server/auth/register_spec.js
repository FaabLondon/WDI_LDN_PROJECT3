/* global api, describe, it, expect, beforeEach */

const User= require('../../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

describe('POST /register', () => {
  beforeEach(done => {
    User.remove({}) // remove user data
      .then(() => done());
  });
  // it defines a test, gives tick etc
  it('should return a token', done => {
    // api is supertest - our api to run tests against
    api
      .post('/api/register') // posts user data to /api/register - to our api (only testing the api)
      .send(userData)
      .end((err, res) => {
        //res.body is the json payload we get back from the request.
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });
  it('Message should confirm registering', done => {
    api
      .post('/api/register')
      .send(userData)     // posting userdata to /api/register
      .end((err, res) => {
        expect(res.body.message).to.eq('Thank you for registering');
        done();
      });
  });
  it('should return a 422 response if the passwords don\'t match', done => {
    const badData = Object.assign({}, userData, { password: 'bad' });
    api
      .post('/api/register')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
});
