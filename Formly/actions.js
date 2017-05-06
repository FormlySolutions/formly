var database = require('./database');

exports.handle_action = function(req, res){
	//this method is part of formly's secure action code request management system.
	database.getAction(req.params.id, function(action) {
		switch(action.type){
		case 'form':
			handle_form_action(action,req, res);
			break;
		}
	});
}
handle_form_action = function(action,req, res){
	console.log('here');
	database.acceptOrDeclineForm(action.student, action.form, req.body.action, function(succesful){
		if(succesful){
			res.status(200).send();
			clear_actions(action.student);
		}
	});
}
clear_actions = function(student_id){
	database.clear_actions(student_id, function(err){
		
	});
}