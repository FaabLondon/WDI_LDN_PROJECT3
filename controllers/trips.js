const { Trip } = require('../models/trip');

function createTripRoute(req, res, next) {
  //we should not allow a trip to be created without signing in as we need to assing a user id to each new trip - or we could assign a temporary user id (dummy) and only when user save, it asks for login and then update trip user id thanks to req.body.user = req.currentUser (after authentification)
  //if we do so, we always need to drop all the trips with dummy users on our landing page...

  Trip.create(req.body)
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

module.exports = {
  createTrip: createTripRoute,
  deleteTrip: deleteTripRoute,
  indexTrip: indexTripRoute,
  showTrip: showTripRoute
};
