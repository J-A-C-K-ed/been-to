import express from 'express';

const db = require('../models/LocationModel.ts');

interface locationControllerType {
  addLocation: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;

  deleteLocation: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
}

const locationController: locationControllerType = {
  addLocation: (req, res, next) => {
    const { countryCode } = req.body;

    const postQuery = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
  `;

    const queryParams = [countryCode];

    db.query(postQuery, queryParams)
      .then((data: any) => {
        console.log('Successfully added to db!');
        res.locals = data.rows[0];
        return next();
      })
      .catch((err: express.ErrorRequestHandler) => {
        next({ log: `userController.addLocation ERROR: ${err}` });
      });
  },

  deleteLocation: (req, res, next) => {
    const { countryCode } = req.body;

    const postQuery = `
      SELECT username FROM users
    `;

    const queryParams = [countryCode];

    db.query(postQuery, queryParams)
      .then((data: any) => {
        console.log('Successfully got user info from db!');
        res.locals = data.rows[0];
        return next();
      })
      .catch((err: express.ErrorRequestHandler) => {
        next({ log: `userController.deleteLocation ERROR: ${err}` });
      });
  },
};

module.exports = locationController;
