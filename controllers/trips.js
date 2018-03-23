const Trip = require('../models/trip');
//const User = require('../models/user');

function createTripRoute(req, res, next) {
  //we should not allow a trip to be created without signing in
  //insert user in create new trip route
  Object.assign(req.body, { user: req.currentUser._id });
  Trip.create(req.body)
  //add that on trip creation, the first date in days array is equalto startDay of trip
    .then(trip => {
      res.status(201).json(trip);
    })
    .catch(next);
}

// Creating a trip and attaching a user to it. The req.body comes from the client side with the information from the form. On the server side it comes back and we attach a user to it.

function deleteTripRoute(req, res, next){
  Trip.findById(req.params.id)
    .then(trip => trip.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

// Request for delete from client with the trip Id as parameter.

function indexTripRoute(req, res, next){
  Trip.find()
    .populate('user') //had to populate user data in order to get access to trip.user._id
    .then(trips => {
      trips = trips.filter(trip => trip.user._id.equals(req.currentUser._id)); // req.currentUser is from secureRoute
      res.status(200).json(trips);
    })
    .catch(next);
}

// Finding the trips for a specific user. Populating the user allows us to access the referenced user data, otherwise it comes back as an object. Find all trips, populate user and filter to find their trips.

function showTripRoute(req, res, next){
  Trip.findById(req.params.id)
    .populate('user')
    .then(trip => res.status(200).json(trip))
    .catch(next);
}


function updateTripRoute(req, res, next){
  //user can change user (once sign in the user is no longer dummy user)
  //user can  not change the date or location of the trip, he would have to create a new trip for that.
  Trip.findById(req.params.id)
    .then(trip => Object.assign(trip, req.body))
    .then(trip => trip.save())
    .then(trip => res.json(trip))
    .catch(next);
}

// Sending request with specific trip id.


module.exports = {
  createTrip: createTripRoute,
  deleteTrip: deleteTripRoute,
  indexTrip: indexTripRoute,
  showTrip: showTripRoute,
  updateTrip: updateTripRoute
};
