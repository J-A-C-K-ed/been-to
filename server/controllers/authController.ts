
import express from 'express';

const db = require('../models/UserModel.ts');
// const variables = require('../../settings.ts');

// const router = express();

// interface authControllerType {
//   findOrCreate: (
//     req: string | number,
//     res: any,
//     next: express.NextFunction
//   ) => void;

//   // getUser: (
//   //   req: express.Request,
//   //   res: express.Response,
//   //   next: express.NextFunction
//   // ) => void;
// }

const authController = {
  findOrCreate: (body: { userName: any; accessToken: any; facebookId: any; }) => {
    console.log('findorcreate', body)
    const { userName, accessToken, facebookId } = body;
    
    const postQuery = `
      INSERT INTO users (username, password, facebook_id)
      VALUES ($1, $2, $3)
      ON CONFLICT (password)
      DO NOTHING;
  `;

    const queryParams = [facebookId, userName, accessToken ];
    db.query(postQuery, queryParams)
      .then((data: any) => data
        // res.locals.newUser = data.rows[0];
        // return next();
        
      )
      .catch((err: any) => 
         err
        // next({ log: `userController.addUser ERROR: ${err}` });
      );
  },

//   getUser: (req, res, next) => {
//     const { userName } = req.body;
//     const getQuery = `
//       SELECT countrycodes 
//       FROM users
//       WHERE username = $1
//     `;

//     const queryParams = [userName];
//     db.query(getQuery, queryParams)
//       .then((data: any) => {
//         res.locals.countryCodes = data.rows[0].countrycodes;
//         return next();
//       })
//       .catch((err: any) => {
//         next({ log: `userController.getUser ERROR: ${err}` });
//       });
//   },
};

module.exports = authController;