import express from 'express';

const userController = require('../controllers/userController');

const router = express();

// create new user
router.post('/createuser', userController.addUser, (req, res) =>
  res.status(200).json(res.locals)
);

// get user
router.get('/getuser', userController.getUser, (req, res) =>
  res.status(200).json(res.locals)
);

module.exports = router;
