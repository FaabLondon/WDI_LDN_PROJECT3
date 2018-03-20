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
  startDate: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
  days: [{
    date: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
    places: []
  }]
};

let token;

describe('POST /trips', () => {
  beforeEach(done => {
    Promise.all([     // promise all takes an array and runs them in parallel like promise.props
      User.remove({}),
      Trip.remove({})
    ])
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }); // .sign creates a token. sub is the payload.
      })
      .then(done);
  });
  it('should return a 401 response without a token', done => {
    api
      .post('/api/trips')
      .send(tripData)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a valid place object', done => { //defines a test
    api //supertest
      .post('/api/trips')
      .send(tripData)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.days).to.be.an('array');
        expect(res.body.startDate).to.be.a('string');
        expect(res.body.location).to.deep.eq(tripData.location);
        done();
      });
  });
});
