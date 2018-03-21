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
let tripId;


xdescribe('DELETE /trips/:id', () => {
  beforeEach(done => {
    Trip.remove({})
      .then(() => Trip.create(tripData))
      .then(trip => {
        tripId = trip._id;
      });
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }); // .sign creates a token. sub is the payload.
      })
      .then(() => done());
  });


  it('should return a 401 response without a token', done => {
    api
      .delete(`/api/trips/${tripId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 204 response with a token', done => {
    api
      .delete(`/api/trips/${tripId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
});
