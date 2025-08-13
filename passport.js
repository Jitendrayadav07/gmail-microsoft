const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const MicrosoftStrategy = require('passport-microsoft').Strategy;
require('dotenv').config(); 

const GOOGLE_CLIENT_USER_ID= process.env.GOOGLE_CLIENT_USER_ID
const GOOGLE_CLIENT_USER_SECRET= process.env.GOOGLE_CLIENT_USER_SECRET
const MICROSOFT_CLIENT_ID= process.env.MICROSOFT_CLIENT_ID
const MICROSOFT_CLIENT_SECRET= process.env.MICROSOFT_CLIENT_SECRET

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_USER_ID,
      clientSecret: GOOGLE_CLIENT_USER_SECRET,
      callbackURL: `http://localhost:5002/v1/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(new MicrosoftStrategy({
  clientID: MICROSOFT_CLIENT_ID,
  clientSecret: MICROSOFT_CLIENT_SECRET,
  callbackURL: `http://localhost:5002/v1/auth/microsoft/callback`,
  scope: ['openid', 'user.read']
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user); 
});