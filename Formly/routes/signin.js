
/*
 * GET signin.
 */

exports.get = function(req, res){
  res.render('../views/pages/signin', { title: 'Express' });
};
exports.post = function(req, res){
	  res.send(req.body);
	};