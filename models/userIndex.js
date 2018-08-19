// // // BASIC SETUP FOR USER AUTH LOGIN AND USER INFO PAGE USING DATA.JS + USERDATA.JS PAGES // // //

// Additional user login dependancies

// app.engine("mustache", mustacheExpress());
app.set("views", "./views");
// app.set("view engine", "mustache");
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Re-direct routes for user login

app.get("/", function (req, res) {
	res.redirect("/login");
});

app.get("/login", function (req, res) {
	res.render("index");
});

// Find and validate user login usernames in index

app.use(session({
	secret: ""
	resave: false 
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

// // // // //

app.post("/", function (res, req) {
	var username = req.body.username;
	var password = req.body.password;
	authenticate(req, username, password);
	if (req.session && req.session.authenticated) {
		res.render("Welcome", { users: data2.users });
	} else {
		res.redirect("/");
	}
})

app.listen(8080, function () {
	console.log("Started Express Application!")
});

// object arrays for user info for data.js page
// module.exports = {
// 	users: [
// 		{
// 			"id": 1;
// 			"username": " ", "name": " ", "avitar": " ", "email": " ",
// 			"future_locations": " ", "locations_visited": " "
// 		},
// 		{
// 			"id": 2;
// 			"username": " ", "name": " ", "avitar": " ", "email": " ",
// 			"future_locations": " ", "locations_visited": " "
// 		},
// 		{
// 			"id": 3;
// 			"username": " ", "name": " ", "avitar": " ", "email": " ",
// 			"future_locations": " ", "locations_visited": " "
// 		},
// 	]
// }
// object arrays for user info for userData.js page

module.exports = {
	users: [
		{
			username: "Meg",
			password: "blahblah"
		},
		{
			username: "Jacob",
			password: "password"
		},
		{
			username: "Angel",
			password: "root"
		}
	]
}