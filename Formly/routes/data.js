/*
 * manage requests for data
 */
var database = require('../database');
var user_data = require('../sample_data/samples/user_data');
exports.get = function(req, res) {
	if (!DEVMODE) {
		get_data(req.cookies.user_id, function(data) {
			res.json(data);
		});
	}else{
		res.json(user_data);
	}
}
exports.post = function(req, res) {
	res.redirect("/app");
};
get_data = function(id, callback) {
	var req_user;
	database.getUserByID(id, function(user) {
		req_user = user;
		var num_children = Object.keys(req_user.children).length;
		req_user.children.forEach(function(child, i) {
			database.getStudentByID(child.id, function(child_data) {
				req_user.children[i] = child_data;
				var num_forms = Object.keys(req_user.children[i].forms).length;
				req_user.children[i].forms.forEach(function(form, x) {
					database.getFormByID(form.id, function(form_data) {
						req_user.children[i].forms[x] = form_data;
						if (i == num_children - 1 && x == num_forms - 1) {
							callback(req_user);
						}
					});
				});
			});
		});
	});
}