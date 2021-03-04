import express from "express";

const userController = require("../controllers/userController");
const verifyController = require("../controllers/verifyController");

const router = express();

// get user
router.post(
  "/get",
  verifyController.verifyUser,
  userController.getUser,
  (req, res) => res.status(200).json(res.locals.countryCodes)
);

// create new user
router.post("/create", userController.addUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
);

module.exports = router;
