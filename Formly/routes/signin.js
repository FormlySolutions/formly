/*
 * GET signin.
 */
var auth = require('../auth');
exports.get = function(req, res) {
	res.render('../views/pages/signin', {
		failed : 'false'
	});
};
exports.post = function(req, res) {
	console.log(req.body.Email);
	auth.auth(req.body.Email, req.body.Password, function(valid) {
		if (valid) {
			sign_in(res);
		} else {
			decline_sign_in(res);
		}
	});
};

sign_in = function(res) {
	let options = {
		maxAge : 1000 * 60 * 15, // would expire after 15 minutes
		httpOnly : false, // The cookie only accessible by the web server
		signed : false
	// Indicates if the cookie should be signed
	}
	res.cookie('user_authenticated', 'true', options);
	res.redirect("/app");
}
decline_sign_in = function(res) {
	res.render('../views/pages/signin', {
		failed : 'true'
	});
}