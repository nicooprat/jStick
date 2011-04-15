$(document).ready(function(){
	
	$('#nav').jStick({
		opacity: .5,
		shadow: '0 3px 3px #666',
		offset: $('#top').height(),
		limit: $('#footer').offset().top,
		onStick: function(){ console.log('stuck'); },
		onUnstick: function(){ console.log('unstuck'); },
		onLimitReached: function(){ console.log('limit reached'); }
	});

});