const router = require('express').Router();
const trips = require('../controllers/trips');

router.route('/trips')
  .post(trips.create);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
