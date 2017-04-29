//environment variables
var USER = null; // holds all user data sent by server.
var active = false; // whether or not the app is active, true only after
// recieving a ajax response for data
// runtime variables
var selected_child = null;
$(function() {// runs as soon as the page is ready and jquery is setup
	// before anything else, make an ajax request to a data port on the server,
	// asking for data to populate the "app"
	get_user_data();
	$('#sidebar').on('click','.main_app_sidebar_item', function() {
		if (active) { // only respond if page is active
			click_sidebar_item($(this));
		}
	}); // forward clicks on sidebar items to the handler function for future
	// differentiation
});
get_user_data = function() {
	$.get('data', function(data, status) {
		USER = data;
		init_user(USER);
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
		sidebar_children.prepend(new_child);
		new_child.slideDown();
	});
}
add_forms_for_child = function(child){
	var forms = child.forms;
	var new_forms_container = $('#new_forms_container');
	var past_forms_container = $('#past_forms_container');
	// remove existing forms from layout
	new_forms_container.children('.main_app_content_form').remove();
	past_forms_container.children('.main_app_content_form').remove();
	// add new forms
	forms.forEach(function(form){
		var new_form = clone_from_template('content_form_template');
		var form_element_id = 'form-' + forms.indexOf(form);
		new_form.attr('id', form_element_id);
		new_form.find('.content_form_name').html(form.name);
		new_form.find('.content_form_date').html(form.date);
		if(form.status == 'UNREAD' || form.status == 'READ'){
			new_forms_container.append(new_form);
		}else{
			past_forms_container.append(new_form);
			switch(form.status){
			case 'READ_ACC': 
				new_form.addClass('content_form_accepted');
				break;
			case 'READ_DEC' :
				new_form.addClass('content_form_declined');
				break;
			}
		}
		new_form.fadeIn();
	});
}
clone_from_template = function(id){
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
handle_child_selection = function(child){
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