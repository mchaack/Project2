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
	scope: ["profile"]
}));

//callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req,res) =>{
	res.send("You reached the callback URI!");
});

module.exports = router;
