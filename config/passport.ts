import { DoneCallback, Profile } from 'passport';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/users');
require('dotenv').config();

passport.serializeUser((user: typeof User, done: DoneCallback) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: DoneCallback) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  }
});

passport.use('google', new GoogleStrategy({
  callbackURL: '/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  scope: ['profile'],
  proxy: true
}, async (accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback) => {
  let currentUser = await User.findOne({
    googleId: profile.id
  });

  if (!currentUser) {
    currentUser = await new User({
      username: profile.displayName,
      googleId: profile.id
    }).save();
  }

  done(null, currentUser);
}));
