$(document).ready(function(){
	
	$('#nav').jStick({
		opacity: .5,
		shadow: '0 3px 3px #666',
		offset: 20,
		onStick: function(){ console.log('stuck'); },
		onUnstick: function(){ console.log('unstuck'); }
	});

});