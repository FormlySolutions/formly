
/*
 * manage requests for data
 */
var user_data = require('../sample_data/samples/user_data');
exports.get = function(req, res){
	var data = user_data; //replace with actual db calls
	res.json(data);
}
exports.post = function(req, res){
	res.redirect("/app");
	};