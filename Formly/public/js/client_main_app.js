//environment variables
var USER = null; // holds all user data sent by server.
var active = false; // whether or not the app is active, true only after
// recieving a ajax response for data
// runtime variables
var content_width;
var content_height;
var selected_child = null;
var selected_form = null;
$(function() {// runs as soon as the page is ready and jquery is setup
	// before anything else, make an ajax request to a data port on the server,
	// asking for data to populate the "app"
	show_notification('Just a sec, formly is loading your data.');
	get_user_data();
	content_width = $('#content').width();
	content_height = $('#content').height();
	$('#sidebar').on('click', '.main_app_sidebar_item', function() {
		if (active) { // only respond if page is active
			click_sidebar_item($(this));
		}
	}); // forward clicks on sidebar items to the handler function for future
	// differentiation
	$('#content').on('click', '.main_app_content_form', function() {
		if (active) {
			handle_form_selection($(this));
		}
	});
	$('#form_details_back').on('click', function() {
		if (active) {
			hide_form_secondary_details($('#form_details_primary'));
			hide_form_details($('#content'));
		}
	});
	$('.button_decline_details_primary').on('click', function() {
		if (active) {
			handle_form_decline();
		}
	});
	$('.button_decline_details_secondary').on('click', function() {
		if (active) {
			handle_form_decline();
		}
	});
	$('.button_continue_details_primary').on('click', function() {
		if (active) {
			add_secondary_form_details();
		}
	});
	$('.button_accept_details_secondary').on('click', function() {
		if (active) {
			handle_form_accept();
		}
	});
});
get_user_data = function() {
	$.get('data', function(data, status) {
		USER = data;
		init_user(USER);
		$('#content').fadeIn();
	});
}
init_user = function(user) {
	// add children to sidebar
	add_sidebar_children(user.children);
	active = true;
}
add_sidebar_children = function(children) {
	var sidebar_children = $('#sidebar_children');
	children.forEach(function(child) {
		var new_child = clone_from_template('sidebar_child_template');
		var sidebar_child_id = 'sidebar_child-' + children.indexOf(child);
		new_child.attr('id', sidebar_child_id);
		new_child.html(child.name);
		sidebar_children.append(new_child);
		new_child.slideDown();
	});
}
add_forms_for_child = function(child) {
	var forms = child.forms;
	var new_forms_container = $('#new_forms_container');
	var past_forms_container = $('#past_forms_container');
	// remove existing forms from layout
	new_forms_container.children('.main_app_content_form').remove();
	past_forms_container.children('.main_app_content_form').remove();
	// add new forms
	forms.forEach(function(form) {
		var new_form = clone_from_template('content_form_template');
		var form_element_id = 'form-' + USER.children.indexOf(child) + '-'
				+ forms.indexOf(form);
		new_form.attr('id', form_element_id);
		new_form.find('.content_form_name').html(form.name);
		new_form.find('.content_form_date').html(form.date);
		if (form.status == 'UNREAD' || form.status == 'READ') {
			new_forms_container.append(new_form);
		} else {
			past_forms_container.append(new_form);
			switch (form.status) {
			case 'READ_ACC':
				new_form.addClass('content_form_accepted');
				break;
			case 'READ_DEC':
				new_form.addClass('content_form_declined');
				break;
			}
		}
		new_form.fadeIn();
		new_form.css('display', 'flex');
	});
}
clone_from_template = function(id) {
	var templatex = $('#' + id).html().trim();
	var new_element = $(templatex);
	return new_element;

}
click_sidebar_item = function(item) {
	// different actions must be triggered based on whether the click was a
	// child or the add child button
	if (item.hasClass('main_app_sidebar_child')) {
		handle_child_selection(item);
	} else {
		// add child button
	}
}
handle_form_selection = function(item) {
	var child_index = (item.attr('id').split('-'))[1];
	var form_index = (item.attr('id').split('-'))[2];
	var child = USER.children[child_index];
	console.log(child.forms[form_index]);
	$('#content').fadeOut(
			function() {
				add_form_details(child, child.forms[form_index], function(
						form_details) {
					form_details.fadeIn();
				});
			});
}
handle_form_decline = function() {
	show_notification('Sending information...');
	$.post('actions/' + selected_form.action, {
		'action' : 'READ_DEC'
	}, function(data, status) {
		hide_form_secondary_details($('#form_details_primary'));
		hide_form_details($('#content'));
		show_notification(
				"Okay, this form has been declined. You can change your mind until "
						+ selected_form.due, 'NEG');
		selected_form.status = 'READ_DEC';
		add_forms_for_child(get_child_object(selected_child));
		selected_form = null;// reset environment variable
	});
}
handle_form_accept = function() {
	show_notification('Sending information...');
	$.post('actions/' + selected_form.action, {
		'action' : 'READ_ACC'
	}, function(data, status) {
		hide_form_secondary_details($('#form_details_primary'));
		hide_form_details($('#content'));
		show_notification(
				"Okay, this form has been accepted. You can change your mind until "
						+ selected_form.due, 'POS');
		selected_form.status = 'READ_ACC';
		add_forms_for_child(get_child_object(selected_child));
		selected_form = null;// reset environment variable
	});
}
add_form_details = function(child, form, callback) {
	selected_form = form;
	var form_details = $('#form_details');
	$('#form_details_overview').html(form.overview);
	$('#form_details_supervisor').html(form.supervisor);
	$('#form_details_cost').html(form.cost);
	callback(form_details);
}
hide_form_details = function(replacement) {
	$('#form_details').fadeOut(function() {
		replacement.fadeIn();
	});
}
hide_form_primary_details = function(replacement) {
	$('#form_details_primary').fadeOut(function() {
		replacement.fadeIn();
	});
}
hide_form_secondary_details = function(replacement) {
	$('#form_details_secondary').fadeOut(function() {
		replacement.fadeIn();
	});
}
add_secondary_form_details = function() {
	var secondary_form = $('#form_details_secondary');
	var container = $('#form_details_secondary_container');
	var appendices = $('<div>');
	// remove any old data
	if ($('#appendices') != null) {
		$('#appendices').remove();
	}
	appendices.attr('id', 'appendices');
	// add appendices
	console.log(selected_form);
	selected_form.appendices.forEach(function(appendix) {
		var new_appendix = $('<div>');
		var new_appendix_title = $('<h3>');
		var seperator = $('<div>');
		seperator.addClass('sub_seperator');
		new_appendix_title.html(appendix.category);
		new_appendix.append(new_appendix_title);
		appendix.clauses.forEach(function(clause) {
			var new_clause = $('<p2>');
			new_clause.html(clause.content + '<br>');
			new_appendix.append(new_clause);
		});
		// the final task is to add the new appendix to the screen, and a
		// seperator
		appendices.append(new_appendix);
		appendices.append(seperator);
	});
	container.prepend(appendices);
	hide_form_primary_details(secondary_form);
}
handle_child_selection = function(child) {
	// the clicked item is a child item
	if (child != selected_child) {// only activate if child is not already
		// selected
		if (selected_child != null) {
			// there is currently a clicked child object
			selected_child.removeClass('main_app_sidebar_child_selected');
		}
		child.addClass('main_app_sidebar_child_selected');
		selected_child = child;
		// get local index of this child
		var child_index = (child.attr('id').split('-'))[1];
		add_forms_for_child(USER.children[child_index]);
	}
}
get_child_object = function(child){
	return USER.children[(child.attr('id').split('-'))[1]];
}
show_notification = function(content, persistent, status) {
	$('#notifications').html(content).slideDown().delay(3000).slideUp();
}