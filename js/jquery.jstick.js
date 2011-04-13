jQuery.fn.jStick = function( settings ) {
	
	// Setting variables
	var el = $(this);
	var top = el.offset().top;
	
	if ( typeof settings === 'undefined' ) var settings = {};
	
	var class =				( settings.class ) ? settings.class : 'stuck';
	var shadow =			( settings.shadow ) ? settings.shadow : false;
	var offset =			( settings.offset ) ? settings.offset : 0;
	var opacityStuck =		( settings.opacity ) ? settings.opacity : 1;
	var opacityUnstuck =	el.css('opacity');
	var boolStuck = 		false;
	var boolUnstuck = 		false;
	
	// When user scrolls...
	$(window).scroll(function() {
	
		if ( $(this).scrollTop() > top - offset )
		{
			
			// Clone element
			if( $('#the_clone').size() === 0 ) {
				
				el
				.clone()
				.attr('id','the_clone')
				.css({
					'visibility':'hidden',
					'height': el.height()
				})
				.insertBefore(el);
				
			}
			
			// Stick element to top
			el
			.css({
				'position': 'fixed',
				'top': offset,
				'width': el.width(),
				'opacity': opacityStuck
			})
			.addClass( class );
			
			if ( shadow ) el.css({ 'box-shadow': shadow });
			
			// Callback onStick
			if ( typeof settings.onStick == 'function' && boolStuck )
			{
				settings.onStick.call(this);
				boolStuck = false;
			}
			
			// Enable callback for unsticking
			boolUnstuck = true;
		
		}
		else
		{
			
			// Remove clone
			if( $('#the_clone').size() > 0 ) $('#the_clone').remove();
			
			// Unstick element
			el
			.css({
				'position': 'static',
				'top': 'auto',
				'width': '',
				'opacity': opacityUnstuck,
				'box-shadow': ''
			})
			.removeClass( class );
			
			// Callback onUnstick
			if ( typeof settings.onUnstick == 'function' && boolUnstuck )
			{
				settings.onUnstick.call(this);
				boolUnstuck = false;
			}
			
			// Enable callback for sticking
			boolStuck = true;
		
		}
	
	});
	
};