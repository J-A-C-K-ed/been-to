import express from 'express';

const db = require('../models/UserModel.ts');

interface userControllerType {
  addUser: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;

  getUser: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
}

// defining our userController object

// add new user

const userController: userControllerType = {
  addUser: (req, res, next) => {
    const { username, email, password } = req.body;

    const postQuery = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
  `;

    const queryParams = [username, email, password];

    db.query(postQuery, queryParams)
      .then((data: any) => {
        console.log('Successfully added to db!');
        res.locals.newUser = data.rows[0];
        return next();
      })
      .catch((err: any) => {
        next({ log: `userController.addUser ERROR: ${err}` });
      });
  },

  getUser: (req, res, next) => {
    const postQuery = `
      SELECT username FROM users
      WHERE id = $1
      RETURNING id
    `;

    const queryParams = [req.params.id];

    db.query(postQuery, queryParams)
      .then((data: any) => {
        console.log('Successfully got user info from db!');
        res.locals.user = data.rows[0];
        return next();
      })
      .catch((err: any) => {
        next({ log: `userController.getUser ERROR: ${err}` });
      });
  },
};

module.exports = userController;
