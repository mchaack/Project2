 // Additional dependancies for user login not utilizing Passport
 // .................UNSURE IF WE SHOULD UTILIZE MUSTACHE.JS FOR HTML ON LOGIN PAGE

 const express = require("express");
 const session = require("express-session");
const bodyParser = require("body-parser");
 const parseurl = require("parseurl");
 // const mustacheExpress = require("mustache-express");
 const app = require("express");
 const data = require("./data.js");
const data2 = require("./userData.js");

 // app.engine("mustache", mustacheExpress());
 app.set("views", "./views");
app.set("view engine", "mustache");
 app.use(express.static("./public"));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

 // Find and validate user login usernames in index

 app.use(session({
 	secret: "keyboard cat",
 	resave: false,
 	saveUninitialized: true
 }));
 app.use(function (req, res, next) {
    var views = req.session.views;
 	if (!views) {
 		views = req.session.views = {};
 	}

 	// get url pathname

 	var pathname = parseurl(req).pathname;

 	// count the views

 	views[pathname] = (views[pathname] || 0) + 1

 	next();
 })

 function authenticate(req, username, password) {
 	var authenticatedUser = data.users.find(function (user) {
		if (username === user.username && password === user.password) {
 			req.session.authenticated = true;
 			console.log("User & Password Authenticated");
         }
         else {
 			return false
 		}
 	});
 	console.log(req.session);
 	return req.session;
     }   
