//This file will abstract and handle all DB communications
MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;
DEVMODE = false; //if true, Database access will be overidden by sample data.
var url = "mongodb://jamohile:hj47rr6r6qId1rzx@cluster0-shard-00-00-ncgje.mongodb.net:27017,cluster0-shard-00-01-ncgje.mongodb.net:27017,cluster0-shard-00-02-ncgje.mongodb.net:27017/Formly?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";

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
exports.getUserByEmail = function(email, callback){
	var user_query = {
			"email" : email
		}
	var projection = {
			"name" : 1,
			"password" : 1
	}
		read_specific('users', user_query, projection, function(user) {
			callback(user[0]);
		});
}
exports.getUserByID = function(id, callback){
	var user_id = ObjectID(id);
	var user_query = {
			"_id" : user_id
		}
		read('users', user_query, function(user) {
			callback(user[0]);
		});
}
exports.getStudentByID = function(id, callback){
	var student_id = ObjectID(id);
	var student_query = {
			"_id" : student_id
	}
	read('students', student_query, function(user){
		callback(user[0]);
	});
}
exports.getFormByID = function(id, callback){
	var form_id = ObjectID(id);
	var form_query = {
			"_id" : form_id
	}
	read('forms', form_query, function(form){
		callback(form[0]);
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
read = function(collectionPath, queries, callback){
	read_specific(collectionPath, queries, {}, function(data){
	callback(data);
	});	
	}

read_specific = function(collectionPath,queries,projection, callback) {
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
