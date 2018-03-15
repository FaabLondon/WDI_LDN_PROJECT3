const router = require('express').Router();
const trips = require('../controllers/trips');
const days = require('../controllers/days');

router.route('/trips')
  .post(trips.create);

router.route('/trips/:id/places/')
  .put(days.updateDay);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
