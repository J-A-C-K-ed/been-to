import express from 'express';

const db = require('../models/UserModel.ts');

interface verifyControllerType {
  verifyUser: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
}

// defining our verifyController object

// checking if user exists and password is correct

const verifyController: verifyControllerType = {
  verifyUser: (req, res, next) => {
    const { userName, passWord } = req.body;
    // console.log(userName, passWord)
    const getQuery = `
      SELECT password 
      FROM users
      WHERE username = $1
    `;

    // const queryParams = [userName, passWord];
    db.query(getQuery, [userName])
      .then((data: any) => data.rows[0])
      .then((userInfo: { username: string | undefined; password: string | undefined }) => {
        if (!userInfo || userInfo.username)  return res.sendStatus(401);
        if (!passWord || passWord !== userInfo.password) return res.sendStatus(401);
        // return next({ log: "ERROR in authController.verifyUser: Inputted password does not match saved password", });
        return next();
      })
      .catch((err: any) => {
        console.log(err);
        next(err);
      });
  },
};
module.exports = verifyController;
