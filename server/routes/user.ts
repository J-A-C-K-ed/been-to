import express from 'express';
// import userController from '../controllers/userController';

const userController = require('../controllers/userController');

const router = express();

// create new user
router.post('/createuser', userController.addUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
);

// get user
router.get('/getuser', userController.getUser, (req, res) =>
  res.status(200).json(res.locals.countryCodes)
);

module.exports = router;
