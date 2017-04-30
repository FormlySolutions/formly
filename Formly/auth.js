//handles and abstracts all user authentication work
var database = require('./database');
exports.auth = function(email, password, callback){
	var result;
	database.getUser(email, password, function(user){
		if(!Object.keys(user).length == 0){// if object is not empty
			result = true;
		}else{
			result = false;
		}
		callback(result);
	});
}
exports.createUser = function(name, email, password, callback){
	database.writeUser(name, email, password);
}
exports.validatePrereg = function(boardName, country, callback){
	var result;
	database.getBoard(boardName, country, function(board){
		if(!Object.keys(board).length == 0){// if not empty
			result = true;
		}else{
			result = false;
		}
		callback(result);
	});
}
