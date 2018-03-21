/* global api, describe, it, expect, beforeEach */
const Trip = require('../../../models/trip');
const User= require('../../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const userData = {
  username: 'test',
  email: 'test@test.com',
  password: 'test',
  passwordConfirmation: 'test'
};

const tripData = {
  location: 'Test Land',
  startDate: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)', // new Date(2018, 3, 15, 0, 0, 0)
  days: [{
    date: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
    places: []
  }]
};
let token;


xdescribe('GET /trips', () => {
  beforeEach(done => {
    Trip.remove({});
    User.remove({})
      .then(() => Trip.create(tripData))
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }); // .sign creates a token. sub is the payload.
      })
      .then(done);
  });
  it('should return a 200 response', done => {
    api
      .get('/api/trips')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});
