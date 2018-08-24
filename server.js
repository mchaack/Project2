// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth-routes.js");
const passportSetup = require("./config/passport-setup");


// Sets up the Express App
// =============================================================
const app = express();
const port = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
app.use("/auth", authRoutes);
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({}).then(function () {
	app.listen(port, function () {
		console.log("Server listening on: http://localhost:" + port);
	});
});