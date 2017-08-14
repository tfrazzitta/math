// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User            = require('../routes/models/user.js');

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
function setupPassport(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);

    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

          // check if the user is already logged in
            if (!req.user) {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
              console.log(user)
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                        console.log(newUser)
                    });
                }
            });
          } else {
              // user already exists and is logged in, we have to link accounts
              var user = req.user; // pull the user out of the session
              user.google.id    = profile.id;
              user.google.token = token;
              user.google.name  = profile.displayName;
              user.google.email = profile.emails[0].value; // pull the first email

              user.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, user);
              });

          }
        });

    }));


};

module.exports = setupPassport;
