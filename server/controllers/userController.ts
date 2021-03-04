import express from "express";

const db = require("../models/UserModel.ts");

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
    RETURNING *
  `;

    const queryParams = [username, email, password];
    db.query(postQuery, queryParams)
      .then((data: any) => {
        res.locals.newUser = data.rows[0];
        return next();
      })
      .catch((err: any) => {
        next({ log: `userController.addUser ERROR: ${err}` });
      });
  },

  getUser: (req, res, next) => {
    const { userName } = req.body;
    const getQuery = `
      SELECT countrycodes 
      FROM users
      WHERE username = $1
    `;

    const queryParams = [userName];
    db.query(getQuery, queryParams)
      .then((data: any) => {
        res.locals.countryCodes = data.rows[0].countrycodes;
        return next();
      })
      .catch((err: any) => {
        console.log(err);
        next({ log: `userController.getUser ERROR: ${err}` });
      });
  },
};

module.exports = userController;
