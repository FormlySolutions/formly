//handles and abstracts all user authentication work
var database = require('./database');
var bcrypt = require('bcrypt');
const saltRounds = 8;
exports.auth = function(email, password, callback) {
	var result;
	database.getUserByEmail(email, function(user) {
		if (!Object.keys(user).length == 0) {// if object is not empty
			bcrypt.compare(password, user.password, function(err, res) {
			   //compare hash to plaintext
				result = res;
			});
			result = true;
		} else {
			result = false;
		}
		callback(result, user);
	});
}
exports.createUser = function(name, email, password, callback) {
	database.getUserByEmail(email, function(user){
		if(Object.keys(user).length == 0){// if user does not exist yet
			bcrypt.hash(password, saltRounds, function(err, hash) {
				database.writeUser(name, email, hash);
				callback('SUCCESS');
			});
		}else{
			callback('EXISTS');
		}
	});
}
exports.validatePrereg = function(boardName, country, callback) {
	var result;
	database.getBoard(boardName, country, function(board) {
		if (!Object.keys(board).length == 0) {// if not empty
			result = true;
		} else {
			result = false;
		}
		callback(result);
	});
}
