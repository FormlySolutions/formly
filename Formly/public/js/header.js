$(function(){
	if(getCookie('user_authenticated') == 'true'){
		if(window.location.pathname != '/app'){
			//redirect to the app
			window.location.href = '/app';
		}
		$('#nav').addClass('hidden');
		$('#profile').removeClass('hidden');
	}else{
		if(window.location.pathname == '/app'){
			//redirect to the app
			window.location.href = '/';
		}
		$('#profile').addClass('hidden');
		$('#nav').removeClass('hidden');
	}
	$('.button_profile').on('click', function(){
		sign_out();
	});
	$('.button_register')
});