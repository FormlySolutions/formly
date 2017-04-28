
/*
 * GET registration.
 */

exports.get = function(req, res){
  res.render('../views/pages/register', { title: 'Express' });
};
exports.post = function(req, res){
	res.redirect("/app");
	};