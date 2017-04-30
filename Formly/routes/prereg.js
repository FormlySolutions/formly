
/*
 * GET preregistration.
 */
var auth = require('../auth');
exports.get = function(req, res){
  res.render('../views/pages/pre_register', { failed: 'false' });
};
exports.post = function(req, res){
	validate_prereg(req, res);
	};
validate_prereg = function(req, res){
	auth.validatePrereg(req.body.Board, req.body.Country, function(valid) {
		if(valid){
			prereg_validated(res);
		}else{
			  res.render('../views/pages/pre_register', { failed: 'true' });
		}
	})
}
prereg_validated = function(res){
	let options = {
			maxAge : 1000 * 60 * 15, // would expire after 15 minutes
			httpOnly : false, // The cookie only accessible by the web server
			signed : false
		// Indicates if the cookie should be signed
		}
		res.cookie('prereg_validated', 'true', options);
		res.redirect("/reg");
}