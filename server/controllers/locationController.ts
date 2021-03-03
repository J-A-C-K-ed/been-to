import express from 'express';

const db = require('../models/UserModel.ts');

interface locationControllerType {
  updateLocations: (
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
  updateLocations: (req, res, next) => {
    const { username, countrycodes } = req.body;
    console.log('user, countrycodes', username, countrycodes);
    const postQuery = `
    UPDATE users
    SET countrycodes = $2
    WHERE username = $1
    RETURNING countrycodes
  `;

    const queryParams = [username, countrycodes];

    db.query(postQuery, queryParams)
      .then((data: any) => {
        console.log('Successfully added to db!', data.rows[0].countrycodes);
        res.locals.countryCodes = data.rows[0].countrycodes;
        return next();
      })
      .catch((err: express.ErrorRequestHandler) => {
        next({ log: `userController.addLocation ERROR: ${err}` });
      });
  },

  deleteLocation: (req, res, next) => {
    const { countryCodes } = req.body;

    const postQuery = `
      SELECT username FROM users
    `;

    const queryParams = [countryCodes];

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
