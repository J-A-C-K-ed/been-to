import express from 'express';

const passport = require('passport');

const userController = require('../controllers/userController');
const verifyController = require('../controllers/verifyController');

const router = express();

// create new user
router.post('/create', userController.addUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
);

// get user
router.get('/get', verifyController.verifyUser, userController.getUser, (req, res) =>
  res.status(200).json(res.locals.countryCodes)
);

router.get('/logout', (req, res) => {
  console.log('before', req.user)
  req.logout();
  console.log('after', req.user)
  res.redirect('/');
});

module.exports = router;
