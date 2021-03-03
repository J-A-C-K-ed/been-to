// import express from 'express';
// const passport = require('passport');
// const util = require('util');
// const InstagramStrategy = require('passport-instagram').Strategy;

// const db = require('../models/UserModel.ts');
// const variables = require('../../settings.ts');

// const router = express();

// interface authControllerType {
//   addUser: (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => void;

//   getUser: (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => void;
// }

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: variables.INSTAGRAM_CLIENT_ID,
//       clientSecret: variables.INSTAGRAM_CLIENT_SECRET,
//       callbackURL: 'http://localhost:3000/auth/instagram/callback',
//     },

// router.get('/auth/instagram', passport.authenticate('instagram'));

// router.get(
//   '/auth/instagram/callback',
//   passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

// module.exports = userController;
