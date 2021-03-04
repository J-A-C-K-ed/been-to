/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import express from 'express';
const cors = require('cors');

const passport = require('passport');

const session = require('express-session');

// const InstagramStrategy = require('passport-instagram').Strategy;

const FacebookStrategy = require('passport-facebook').Strategy;

const db = require('../models/UserModel.ts');

const variables = require('../../settings.ts');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

passport.serializeUser(function (user: any, done: (arg0: null, arg1: any) => void) {
  done(null, user.facebook_id);
});

passport.deserializeUser(function (facebookId: any, done: (arg0: null, arg1: any) => void) {
  // done(null, obj);
  const getUserQuery = 'SELECT * FROM users WHERE facebook_id = $1';
  db.query(getUserQuery, [facebookId])
    .then((data: { rows: any[] }) => done(null, data.rows[0]))
    .catch(() => {
      done(null, false)
    });
});

app.use(
  session({
    secret: variables.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/user/get', function (req, res) {
  res.render('account', { user: req.user });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: variables.FACEBOOK_APP_ID,
      clientSecret: variables.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:8080/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    async function (
      accessToken: string,
      refreshToken: any,
      profile: { id: any; displayName: string },
      done: (arg0: null, arg1: any) => any
    ) {
      // asynchronous verification, for effect...
      const findUser = 'SELECT * FROM users WHERE facebook_id = $1';
      const params = [profile.id];
      let user = await db
        .query(findUser, params)
        .then((data: { rows: any[] }) => data.rows[0])
        .catch((err: string | undefined) => {
          throw new Error(err);
        });
      if (!user) {
        const postQuery = `
          INSERT INTO users (facebook_id, username, password)
          VALUES ($1, $2, $3)
          RETURNING *
        `;

        const createUserParams = [profile.id, profile.displayName, accessToken];
        user = await db
          .query(postQuery, createUserParams)
          .then((data: { rows: any[] }) => data.rows[0])
          .catch((err: string | undefined) => {
            throw new Error(err);
          });
      }
      return done(null, user);
    }
  )
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:8080/');
  }
);

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/' }),
//   function (req, res) {
//     req.login(req.user, (err) => {
//       if (err) return err;
//       res.redirect('http://localhost:8080/');
//     });
//   }
// );

module.exports = app;
