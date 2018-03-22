/* global api, describe, it, expect, beforeEach */
const Trip = require('../../../models/trip');
const User = require('../../../models/user');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../../../config/environment');

let token;
// let user;

describe('GET /trips', () => {
  beforeEach(done => {
    Promise.all([     // promise all takes an array and runs them in parallel like promise.props
      User.remove({}),
      Trip.remove({})
    ])
      .then(() => {
        api
          .post('/api/register')
          .send({
            username: 'username',
            email: 'email@email.com',
            password: 'password',
            passwordConfirmation: 'password'
          })
          .then((res) => {
            token = res.body.token;
          })
          .then(() => {
            api
              .post('/api/trips')
              .set('Authorization', `Bearer ${token}`)
              .send({
                location: 'Test Land',
                startDate: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
                days: [{
                  date: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
                  places: []
                }]
              })
              .end(done);
          });
      });
  });

  it('should return a 401 if request made without token', done => {
    api
      .get('/api/trips')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
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
