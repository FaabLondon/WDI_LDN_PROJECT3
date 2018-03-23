const router = require('express').Router();
const trips = require('../controllers/trips');
// const days = require('../controllers/days');
const places = require('../controllers/places');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/trips')
  .post(secureRoute, trips.createTrip) // adding a new trip
  .get(secureRoute, trips.indexTrip); // showing all the trips for a specific user

router.route('/trips/:id')
  .get(secureRoute, trips.showTrip) // show a specific trip. daily plan view.
  .put(secureRoute, trips.updateTrip) // not used.
  .delete(secureRoute, trips.deleteTrip); // delete atrip on the index page

//add a new place to trip
router.route('/trips/:id/places')
  .post(secureRoute, places.createPlaceDay); // adding a place to a trip, like a comment. Require trip id and place id.

//delete a place from trip
router.route('/trips/:id/places/:placeId')
  .delete(secureRoute, places.deletePlaceDay); // deleting a place from a trip.

//registration
router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
