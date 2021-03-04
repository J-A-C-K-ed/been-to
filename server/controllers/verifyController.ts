import express from "express";

const db = require("../models/UserModel.ts");

interface verifyControllerType {
  verifyUser: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void;
}

// defining our verifyController object

// checking if user exists and password is correct

const verifyController: verifyControllerType = {
  verifyUser: (req, res, next) => {
    const { userName, passWord } = req.body;
    const getQuery = `
      SELECT password 
      FROM users
      WHERE username = $1
    `;

    // const queryParams = [userName, passWord];
    db.query(getQuery, [userName])
      .then((data: any) => data.rows[0].password)
      .then((pass: string) => {
        if (!passWord || passWord !== pass)
          return next({
            log:
              "ERROR in authController.verifyUser: Inputted password does not match saved password",
          });
        return next();
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  },
};
module.exports = verifyController;
