$(function(){
	if(getCookie('user_authenticated') == 'true'){
		if(window.location.pathname != '/app'){
			//redirect to the app
			window.location.href = '/app';
		}
		$('#nav').hide();
		$('#profile').show();
	}else{
		if(window.location.pathname == '/app'){
			//redirect to the app
			window.location.href = '/';
		}
		$('#nav').show();
		$('#profile').hide();
	}
	$('.button_profile').on('click', function(){
		sign_out();
	})
});