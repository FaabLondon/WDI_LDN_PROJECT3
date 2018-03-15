const { Trip } = require('../models/trip');

function createRoute(req, res, next) {
  Trip.create(req.body)
    .then(trip => res.status(201).json(trip))
    .catch(next);
}


module.exports = {
  create: createRoute
};
