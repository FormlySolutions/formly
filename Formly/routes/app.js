
/*
 * GET app.
 */

exports.get = function(req, res){
	if (req.cookies.user_authenticated == 'true') {
		  res.render('../views/pages/main_app', { title: 'Express' });
	} else {
		res.redirect('/')
	}
};
exports.post = function(req, res){
	
	};