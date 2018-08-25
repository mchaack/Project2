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
		db.traveltables.findAll({})
			.then(function (traveltables) {
				res.json(traveltables);
			});
	});

	app.post("/api/future_locations", function (req, res) {
		db.traveltables.findOne({
			where: { id: req.user.dataValues.id }			
		}).then( user => {
			user.updateAttributes({future_location: req.body.future_location});
			res.json(user);
		});
	});
};
