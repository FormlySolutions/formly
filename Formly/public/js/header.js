$(function(){
	if(getCookie('user_authenticated') == 'true'){
		$('#nav').hide();
		$('#profile').show();
	}else{
		$('#nav').show();
		$('#profile').hide();
	}
	$('.button_profile').on('click', function(){
		
	})
});