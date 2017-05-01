/*
 * manage requests for data
 */
var database = require('../database');
var user_data = require('../sample_data/samples/user_data');
exports.get = function(req, res) {
	get_data(req.cookies.user_id)
}
exports.post = function(req, res) {
	res.redirect("/app");
};
get_data = function(id, callback) {
	var req_user;
	database.getUserByID(id, function(user) {
		req_user = user;
		req_user.children.forEach(function(child, i) {
			database.getStudentByID(child.id, function(child_data) {
				req_user.children[i] = child_data;
				console.log(req_user);
			})
		});
	});
}