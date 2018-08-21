// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================


// Requiring our Todo model
const db = require("../models");

// =============================================================
module.exports = function (app) {
	// GET route for getting all of the posts
	app.get("/api/future_locations/", function (req, res) {
		db.TravelTable.findAll({})
			.then(function (TravelTable) {
				res.json(TravelTable);
				console.log(TravelTable);
			});
	});

	app.post("/api/future_locations", function (req, res) {
		console.log(req.body);
		db.TravelTable.create({
			username: req.body.username,
			email: req.body.email,
			image: req.body.image,
			future_location: req.body.future_location
		}).then(function (dbPost) {
			res.json(dbPost);
			// res.redirect("/user_map?" + "username=" + dbPost.username);
		});
	});
	// app.put("/api/future_locations", function (req, res) {
	// 	console.log(req.body);
	// 	db.TravelTable.update({
	// 		image: req.body.image,
	// 		future_location: req.body.future_location
	// 	}, {
	// 			where: {
	// 				id: req.body.username
	// 			}
	// 		}).then(function (dbTodo) {
	// 			res.json(dbTodo);
	// 		});
	// });


	// db.TravelTable.findOne({ username: req.body.username }).then(function(){
	// 	db.TravelTable.update({

	// 	})
	// })({
	// 	username: req.body.username,
	// 	email: req.body.email,
	// 	}).then(function (dbPost) {
	// 		res.json(dbPost);
	// 	});
	// });


};
