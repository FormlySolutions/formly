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
	auth.auth(req.body.Email, req.body.Password, function(valid, user) {
		if (valid) {
			console.log(user._id);
			sign_in(res, user._id.toString());
		} else {
			decline_sign_in(res);
		}
	});
};

sign_in = function(res, user_id) {
	let options = {
		maxAge : 1000 * 60 * 15, // would expire after 15 minutes
		httpOnly : false, // The cookie only accessible by the web server
		signed : false
	// Indicates if the cookie should be signed
	}
	res.cookie('user_authenticated', 'true', options);
	res.cookie('user_id', user_id, options);
	res.redirect("/app");
}
decline_sign_in = function(res) {
	res.render('../views/pages/signin', {
		failed : 'true'
	});
}