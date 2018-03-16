const Trip = require('../models/trip');

function createTripRoute(req, res, next) {
  //we should not allow a trip to be created without signing in
  //insert user in create new trip route
  Trip.create(req.body)
  //add that on trip creation, the first date in days array is equalto startDay of trip
    .then(trip => res.status(201).json(trip))
    .catch(next);
}

function deleteTripRoute(req, res, next){
  Trip.findById(req.params.id)
    .then(trip => trip.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function indexTripRoute(req, res, next){
  Trip.find()
    .then(trips => res.status(200).json(trips))
    .catch(next);
}

function showTripRoute(req, res, next){
  Trip.findById(req.params.id)
    .then(trip => res.status(200).json(trip))
    .catch(next);
}

// function updateTripRoute(req, res, next){
//   //user can change user (once sign in the user is no longer dummy user)
//   //user can  not change the date or location of the trip, he would have to create a new trip for that.
//   Trip.findById(req.params.id)
//     .then(trip => Object.assign(trip, req.body))
//     .then(trip => trip.save())
//     .then(trip => res.json(trip))
//     .catch(next);
// }

module.exports = {
  createTrip: createTripRoute,
  deleteTrip: deleteTripRoute,
  indexTrip: indexTripRoute,
  showTrip: showTripRoute
  // updateTrip: updateTripRoute
};
