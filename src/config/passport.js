const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const { SECRET_TOKEN } = require('../config');

// Create Local Strategy for sign in.
const localOptions = { usernameField: 'email' }
passport.use(new LocalStrategy(localOptions, authenticate));


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET_TOKEN
};
passport.use(new JwtStrategy(jwtOptions, jwtLogin));


// used to authenticate users
function authenticate(email, password, done) {
  // verify this email and pass, call done with user
  // if it is a correct username and password
  // otherwise, call done with false
  User.findOne({email: email}, (err, user) => {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, false);
    }


    // compare passwords
    user.comparePassword(password, (err, isMatch) => {
      if(err) {
        return done(err);
      }

      if(!isMatch) {

        return done(null, false);
      }
      return done(null, user);
    })
  });
}


// middleware for requiring authoriz
function jwtLogin(payload, done) {
  // see if the user id in the payload exists in our database
  // if it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    return done(null, user);
  });
}
