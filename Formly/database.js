//This file will abstract and handle all DB communications
MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/formly";

exports.init = function() {
	MongoClient.connect(url, function(err, db) {
		console.log('Succesfully connected to database.');
	});
}
exports.writeUser = function(name, email, password, callback) {
	var user = [ {
		"name" : name,
		"email" : email,
		"password" : password
	} ];
	write("users", user, function() {

	});
}
exports.getUser = function(email, password, callback) {
	var user_query = {
		"email" : email,
		"password" : password
	}
	read('users', user_query, function(user) {
		callback(user);
	});
}
exports.getBoard = function(name, country, callback) {
	var board_query = {
		"name" : name,
		"country" : country
	}
	read('boards', board_query, function(board) {
		callback(board);
	});
}
write = function(collectionPath, data, callback) {
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection(collectionPath);
		collection.insertMany(data, function(err, result) {
			callback(result);
		});
	});
}
read = function(collectionPath, queries, callback) {
	MongoClient.connect(url, function(err, db) {
		var collection = db.collection(collectionPath);
		collection.find(queries, function(err, cursor) {
			cursor.toArray().then(function(data) {
				callback(data);
			}, function(reason) {

			})
		});
	});
}