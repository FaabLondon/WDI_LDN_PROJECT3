// /* global api, describe, it, expect, beforeEach */
//
// const Trip = require('../../../models/trip');
// const User= require('../../../models/user');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../../../config/environment');
//
// const userData = {
//   username: 'test',
//   email: 'test@test.com',
//   password: 'test',
//   passwordConfirmation: 'test'
// };
//
// const placeData = {
//   name: 'Test',
//   address: '101 test rd',
//   location: {
//     lat: 51.7 ,
//     lng: -0.07
//   },
//   image: 'http://test.jpg',
//   description: 'wonderful in every way',
//   rating: 5,
//   googleId: 'googleId'
// };
//
// const tripData = {
//   location: 'Test Land',
//   startDate: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
//   days: [{
//     date: 'Thu Apr 15 2018 00:00:00 GMT+0100 (CET)',
//     places: []
//   }]
// };
//
// let token;
// let tripId;
//
// describe('PUT /trips/:id', () => {
//   beforeEach(done => {
//     Trip.remove({})
//       .then(() => Trip.create(tripData))
//       .then(trip => {
//         tripId = trip._id;
//       });
//     User.remove({})
//       .then(() => User.create(userData))
//       .then(user => {
//         token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' }); // .sign creates a token. sub is the payload.
//       })
//       .then(() => done());
//   });
//   it('should return a 401 response without a token', done => {
//     api
//       .put(`/api/trips/${tripId}`)
//       .send(placeData)
//       .end((err, res) => {
//         expect(res.status).to.eq(401);
//         done();
//       });
//   });
//
//   it('should check location has been updated to chicken', done => {
//     const updatedData = Object.assign({}, tripData, { location: 'chicken' });
//     api
//       .put(`/api/trips/${tripId}`)
//       .send(updatedData)
//       .set('Authorization', `Bearer ${token}`)
//       .end((err, res) => {
//         expect(res.status).to.eq(200);
//         console.log(res.body);
//         console.log(placeData);
//         console.log(updatedData);
//         expect(res.body.location).to.eq('chicken');
//         done();
//       });
//   });
//
//   it('should add place data to a day', done => {
//     const updatedData = Object.assign({}, tripData, { days: { places: [placeData] } } );
//     api
//       .put(`/api/trips/${tripId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedData)
//       .end((err, res) => {
//         console.log(res.body);
//         expect(res.status).to.eq(200);
//         expect(res.body.days[0].places.length).to.eq(1);
//         done();
//       });
//   });
//
// });
