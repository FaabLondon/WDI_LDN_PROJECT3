const router = require('express').Router();
const trips = require('../controllers/trips');
const days = require('../controllers/days');
const places = require('../controllers/places');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/trips')
  .post(secureRoute, trips.createTrip)
  .get(secureRoute, trips.indexTrip);

router.route('/trips/:id')
  .get(secureRoute, trips.showTrip)
  .put(secureRoute, trips.updateTrip)
  .delete(secureRoute, trips.deleteTrip);

//add a new place to trip
router.route('/trips/:id/places')
  .post(secureRoute, places.createPlaceDay);

//delete a place from trip
router.route('/trips/:id/places/:placeId')
  .delete(secureRoute, places.deletePlaceDay);

//registration
router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
