import express from 'express';

const locationController = require('../controllers/locationController');

const router = express();

// get all locations
router.post('/addlocation', locationController.addLocation, (req, res) =>
  res.status(200).json(res.locals.countryCodes)
);

// add a location
router.delete(
  '/deletelocation',
  locationController.deleteLocation,
  (req, res) => res.status(200).json(res.locals.countryCodes)
);

module.exports = router;
