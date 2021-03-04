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

module.exports = router;
