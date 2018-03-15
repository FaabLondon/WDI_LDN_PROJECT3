const Trip = require('../models/trip');

function createRoute(req, res, next) {
  Trip.create(req.body)
    .then(place => res.status(201).json(place))
    .catch(next);
}


module.exports = {
  create: createRoute
};
