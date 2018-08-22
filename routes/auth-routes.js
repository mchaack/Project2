const router = require("express").Router();
const path = require("path");
const passport = require("passport");

router.get("/login", function(req, res) {
	res.sendFile(path.join(__dirname, "../public/login.html"));
});


router.get("/logout", (req, res) => {
	res.send("logging out");
});

//auth with google
router.get("/google", passport.authenticate("google",{
	scope: ["email"]
}));

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req,res) =>{
	// res.send(req.user);
	res.redirect("/user_map");
});

router.get("/auth/google/callback", 
	passport.authenticate("google", { failureRedirect: "/login" }),
	function(req, res) {
		res.redirect("/");
	});

module.exports = router;
