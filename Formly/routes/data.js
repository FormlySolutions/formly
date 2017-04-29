
/*
 * manage requests for data
 */

exports.get = function(req, res){
	var data = {name: 'john'};
	res.json(data);
}
exports.post = function(req, res){
	res.redirect("/app");
	};