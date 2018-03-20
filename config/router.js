const router = require('express').Router();
const trips = require('../controllers/trips');
const days = require('../controllers/days');
const places = require('../controllers/places');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/trips')
  .post(secureRoute, trips.createTrip);

router.route('/user/:userId/trips')
  .get(trips.indexTrip); //put secureRoute back in

router.route('/trips/:id')
  .get(trips.showTrip) //put secureRoute back in
  .put(trips.updateTrip) //put secureRoute back in
  .delete(trips.deleteTrip); //put secureRoute back in

//add a new place to trip
router.route('/trips/:id/places')
  .post(places.createPlaceDay); //put secureRoute back in

//delete a place from trip
router.route('/trips/:id/places/:placeId')
  .delete(places.deletePlaceDay); //put secureRoute back in

//registration
router.post('/register', auth.register);
router.post('/login', auth.login);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
