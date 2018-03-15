const { Trip, Day, Place } = require('../models/trip');

function updateDayRoute(req, res, next) {
  Trip.findById(req.params.id)
    .then(trip => {
      trip.days[0].places.push(req.body);
      return trip.save();
    })
    .then(trip => res.json(trip))
    .catch(next);
}

module.exports = {
  updateDay: updateDayRoute
};
