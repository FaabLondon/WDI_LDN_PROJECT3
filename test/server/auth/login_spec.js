/* global api, describe, it, expect, beforeEach */

const User= require('../../../models/user');
const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};
// needs to be a user in our database before we can login
describe('POST /login', () => {
  beforeEach(done => {
    User.remove({}) // remove user first, then create user so we can login
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a token', done => {
    api
      .post('/api/login') // posts user data to /api/register - to our api (only testing the api)
      .send(userData)
      .end((err, res) => {
        //res.body is the json payload we get back from the request.
        expect(res.body.token.split('.').length).to.eq(3);
        done();
      });
  });
  it('should retun a 401 response if the password is bad', done => {
    const badData = {   email: 'test@test.com', password: 'bad' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should retun a 401 response if the user does not exist', done => {
    const badData = {   email: 'bad@test.com', password: 'test' };

    api
      .post('/api/login')
      .send(badData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
});
