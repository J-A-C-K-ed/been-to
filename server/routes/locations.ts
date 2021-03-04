import express from 'express';

const locationController = require('../controllers/locationController');

const router = express();

// get all locations
router.post('/update', locationController.updateLocations, (req, res) =>
  res.status(200).json(res.locals.countryCodes)
);

// delete a location
router.delete('/delete', locationController.deleteLocation, (req, res) =>
  res.status(200).json(res.locals.countryCodes)
);

// add location details
router.post('/details/add', locationController.addCountryDetails, (req, res) =>
  res.status(200).json(res.locals.newCountryDetails)
);

// get location details
router.post('/details/get', locationController.getCountryDetails, (req, res) =>
  res.status(200).json(res.locals.countryDetails)
);

module.exports = router;
