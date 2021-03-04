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

  addCountryDetails: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;

  getCountryDetails: (
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

  addCountryDetails: (req, res, next) => {
    console.log('in addCountryDetails middleware');
    const {
      userId,
      name,
      countrycode,
      photos,
      restaurants,
      buddies,
      notes,
    } = req.body;

    const postQuery = `
    INSERT INTO countries (
      user_id,
      name,
      countrycode,
      photos,
      restaurants,
      buddies,
      notes
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;

    const queryParams = [
      userId,
      name,
      countrycode,
      photos,
      restaurants,
      buddies,
      notes,
    ];

    db.query(postQuery, queryParams)
      .then((data: any) => {
        console.log('Successfully added to db!', data.rows[0]);
        res.locals.newCountryDetails = data.rows[0];
        return next();
      })
      .catch((err: express.ErrorRequestHandler) => {
        next({ log: `locationController.addCountryDetails ERROR: ${err}` });
      });
  },

  getCountryDetails: (req, res, next) => {
    const { userId, name, countrycode } = req.body;

    const getQuery = `
    SELECT photos, restaurants, buddies, notes 
    FROM countries
    WHERE user_id = $1
    AND name = $2
    AND countrycode = $3
  `;

    const queryParams = [userId, name, countrycode];

    db.query(getQuery, queryParams)
      .then((data: any) => {
        res.locals.countryDetails = data.rows[0];
        return next();
      })
      .catch((err: express.ErrorRequestHandler) => {
        next({ log: `userController.getCountryDetails ERROR: ${err}` });
      });
  },
};

module.exports = locationController;
