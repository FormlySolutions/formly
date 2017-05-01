/*
 * GET registration.
 */
var auth = require('../auth');
exports.get = function(req, res) {
	if (req.cookies.prereg_validated == 'true') {
		res.render('../views/pages/register', {
			failed : 'false'
		});
	} else {
		res.redirect('/')
	}
};
exports.post = function(req, res) {
	if (req.cookies.prereg_validated == 'true') {
		console.log(req.body);
		auth.createUser(req.body.Name, req.body.Email, req.body.Password, function(result){
			switch(result){
			case 'SUCCESS' : 
				res.redirect("/signin");
				break;
			default :
				res.render('../views/pages/register', {
					failed : 'true'
				});
			}
		});
	} else {
		res.redirect('/')
	}
};