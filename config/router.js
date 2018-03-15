const router = require('express').Router();
const trips = require('../controllers/trips');
const days = require('../controllers/days');
const places = require('../controllers/places');

router.route('/trips')
  .post(trips.createTrip);

router.route('/trips/:id')
  .delete(trips.deleteTrip);

router.route('/trips/:id/places')
  .post(places.createPlaceDay); //changed to post as creating new place

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
