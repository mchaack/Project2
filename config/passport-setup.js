require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../models");

passport.serializeUser((user, done) => {
	done(null, user.id);
});


passport.deserializeUser((id, done) => {
	db.traveltables.findById(id).then(user => {
		done(null, user);
	});

});


passport.use(
	new GoogleStrategy({
		callbackURL: "/auth/google/redirect",
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	}, (accessToken, refreshToken, profile, done) => {
		const username = profile.displayName;
		const email = profile.emails[0].value;
		const image = profile.photos[0].value.replace(/\?sz=50/g, "");

		db.traveltables.findOrCreate({
			where: {
				username: username,
				email: email,
				image: image
			}
		}).then(function (currentUser) {
			const currentUsersDbId = currentUser[0].dataValues.id;
			console.log("currentUsersDbId", currentUsersDbId);
			done(null, currentUser[0].dataValues);
		});

	})
);