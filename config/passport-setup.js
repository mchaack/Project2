require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
	new GoogleStrategy({
		//options for the strategy
		callbackURL:"/auth/google/redirect",
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	}, (accessToken, refreshToken, profile, done) => {
		//passport callback function
		console.log("passport callback function fired");
		console.log("profile.id", profile.id);
		console.log("profile.emails[0].value", profile.emails[0].value);
		console.log("profile.photos[0].value", profile.photos[0].value);
		// console.log("profile", profile);
	})
);