var selected_child = null;
var DATA = null; //holds all user data sent by server. 
var active; // whether or not the app is active, after recieving a ajax request for data
$(function() {// runs as soon as the page is ready and jquery is setup
	// before anything else, make an ajax request to a data port on the server,
	// asking for data to populate the "app"
	$.get('data', function(data, status) {
		DATA = data;
	});
	$('.main_app_sidebar_item').on('click', function() {
		click_sidebar_item($(this));
	}); // forward clicks on sidebar items to the handler function for future
	// differentiation
});
get_data = function() {
	var httpReq = new XMLHttpRequest();
	httpReq.open("GET", "app", true);
	httpReq.send();
}
click_sidebar_item = function(item) {
	// different actions must be triggered based on whether the click was a
	// child or the add child button
	if (item.hasClass('main_app_sidebar_child')) {
		// the clicked item is a child item
		if (item != selected_child) {// if user clicked on already clicked
			// child...do nothing
			remove_app_content_header();
			if (selected_child != null) {
				// there is currently a clicked child object
				selected_child.removeClass('main_app_sidebar_child_selected');
			}
			item.addClass('main_app_sidebar_child_selected');
			selected_child = item;
			add_app_content_header('John');
		}
	} else {
		// add child button
		get_data();
	}
}
remove_app_content_header = function() {
	$('#app_content_header_name').fadeOut("linear");
}
add_app_content_header = function(name) {
	$('#app_content_header_name').html(name);
	$('#app_content_header_name').fadeIn("linear");
}