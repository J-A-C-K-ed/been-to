import express from 'express';

const passport = require('passport');

const InstagramStrategy = require('passport-instagram').Strategy;

const db = require('../models/UserModel.ts');

const variables = require('../../settings.ts');

const router = express();

interface authControllerType {
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

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done: any) {
  done(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new InstagramStrategy(
    {
      clientID: variables.INSTAGRAM_CLIENT_ID,
      clientSecret: variables.INSTAGRAM_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/instagram/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      User.findOrCreate(
        { instagramId: profile.id },
        function (err: express.ErrorRequestHandler, user: any) {
          return done(err, user);
        }
      );
    }
  )
);

router.get('/auth/instagram', passport.authenticate('instagram'));

router.get(
  '/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function (req: express.Request, res: express.Response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = router;
