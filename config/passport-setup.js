require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../models");

passport.serializeUser((user, done) => {
	// console.log("********************* Serializing userId", user);
	done(null, user.id);
});


passport.deserializeUser((id, done) => {
	db.traveltables.findById(id).then(user => {
		// console.log("********************* deserializing user", user);
		done(null, user);
	});

});


passport.use(
	new GoogleStrategy({
		//options for the strategy
		callbackURL: "/auth/google/redirect",
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	}, (accessToken, refreshToken, profile, done) => {
		//passport callback function
		// const googleId = profile.id;
		const username = profile.displayName;
		const email = profile.emails[0].value;
		const image = profile.photos[0].value.replace(/\?sz=50/g, "");
		// console.log("id", googleId);
		// console.log("username", username);
		// console.log("email", email);
		// console.log("image", image);
		// console.log("profile", profile);
		db.traveltables.findOrCreate({
			where: {
				username: username,
				email: email,
				image: image
			}
		}).then(function (currentUser) {
			const currentUsersDbId = currentUser[0].dataValues.id;
			// console.log("currentUser", currentUser);
			console.log("currentUsersDbId", currentUsersDbId);
			// console.log(currentUser[0].traveltables.dataValues.email);
			done(null, currentUser[0].dataValues);
		});

	})
);