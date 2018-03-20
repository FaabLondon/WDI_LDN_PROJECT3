const Trip = require('../models/trip');

//add place
function createPlaceDayRoute(req, res, next) {
  Trip.findById(req.params.id)
    .then(trip => {
      trip.days[0].places.push(req.body);
      return trip.save();
    })
    .then(trip => res.json(trip))
    .catch(next);
}

//delete place
function deletePlaceDayRoute(req, res, next){
  Trip.findById(req.params.id)
    .then(trip => {
      // const place = trip.days[0].places.id(req.params.placeId);
      const place = trip.days[0].places.id(req.params.placeId);

      place.remove();
      return trip.save();
    })
    .then((trip) => {
      res.json(trip);
    }) //check if we should return anything...
    .catch(next);
}

// function showPlaceDayRoute(req, res, next){
//   Trip.findById(req.params.id)
//     .then(trip => {
//       const place = trip.days[0].places.find({googleId: req.params.placeId});
//       place.remove();
//       return trip.save();
//     })
//     .then(() => res.sendStatus(204)) //check if we should return anything...
//     .catch(next);
// }
//still need to do showPlaceDayRoute
//and indexplaces
//no need for updatePlaces


module.exports = {
  createPlaceDay: createPlaceDayRoute,
  deletePlaceDay: deletePlaceDayRoute
};
