// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
// const app = 
require("express");

const authCheck = (req, res, next) => {
	if(!req.user){
		// if user is not logged in, redirect them
		res.redirect("/auth/login");
	}else{
		next();
	}
};

// Routes
// =============================================================
module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.

	// index route loads view.html
	app.get("/user_map", authCheck, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/user_map.html"));
	});

	// 	app.get("/", function(req, res) {
	// 		res.sendFile(path.join(__dirname, "../public/index.html"));
	// 	});

	// blog route loads blog.html
	app.get("/public_map", authCheck, function(req, res) {
		res.sendFile(path.join(__dirname, "../public/public_map.html"));
	});
	
	// Re-direct routes for user login (non-passport)

	app.get("/", function (req, res) {
		res.redirect("/auth/login");
	});

	// app.get("/login", function (req, res) {
	// res.render("index");
	// });

	// 	app.post("/", function (res, req) {
	// 		let username = req.body.username;
	// 		let password = req.body.password;
	// 		authenticate(req, username, password);
	// 		if (req.session && req.session.authenticated) {
	// 			res.render("Welcome", { users: data2.users });
	// 		} else {
	// 			res.redirect("/");
	// 		}
	// 	})

	// app.listen(8080, function () {
	// 	console.log("Started Express Application!")
	// });
};
	
