const { Trip, Day, Place } = require('../models/trip');

function updateDayRoute(req, res, next) {
  let createdPlace = {};
  Place.create(req.body)
    .then(place => createdPlace = place);

  Trip.findById(req.params.id)
    .then(trip => {
      trip.days[0].places.push(createdPlace);
      trip.save();
      res.json(trip);
    })
    .catch(next);
}

module.exports = {
  updateDay: updateDayRoute
};
