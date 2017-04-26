
/*
 * GET preregistration.
 */

exports.get = function(req, res){
  res.render('../views/pages/pre_register', { title: 'Express' });
};
exports.post = function(req, res){
	  res.redirect("/reg");
	};