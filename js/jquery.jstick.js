jQuery.fn.jStick = function( settings ) {
	
	// Setting variables
	var el = $(this);
	var top = el.offset().top;
	var left = el.offset().left;
	
	if ( typeof settings === 'undefined' ) var settings = {};
	
	var class =				( settings.class ) ? settings.class : 'stuck';
	var offset =			( settings.offset ) ? settings.offset : 0;
	var boolStuck = 		false;
	var boolUnstuck = 		false;
	var boolLimit =			true;
	var limit =				( settings.limit ) ? settings.limit : false;
	var cloneClass =		( settings.cloneClass ) ? settings.cloneClass : 'the_clone';
	var cancelIfTooHigh =		( settings.cancelIfTooHigh ) ? settings.cancelIfTooHigh : true;
	
	// When user scrolls...
	$(window).scroll(function() {
	
		if( ( el.outerHeight() < $(window).height() ) || !cancelIfTooHigh ) {
		
			if ( $(this).scrollTop() > top - offset )
			{
				// Limit reached
				if ( limit && $(this).scrollTop() + offset + el.outerHeight() > limit )
				{
					// Fix element to the limit
					el
					.css({
						'position': 'absolute',
						'top': limit - el.outerHeight(),
						'left': left
					})
					.addClass( class );
					
					// Callback onLimitReached
					if ( typeof settings.onLimitReached == 'function' && boolLimit )
					{
						settings.onLimitReached.call(this);
						boolLimit = false;
					}
						
					// Enable other callbacks
					boolStuck = true;
					boolUnstuck = true;
				}
				// Stick it !
				else
				{
					// Clone element
					if( $('.'+cloneClass).size() === 0 ) {
						
						el
						.clone()
						.addClass(cloneClass + ' ' + class)
						.css({
							'visibility':'hidden'
						})
						.insertBefore(el);
						
					}
					
					// Stick element to top
					el
					.css({
						'position': 'fixed',
						'top': offset,
						'left': left,
						'width': el.width()
					})
					.addClass( class );
					
					// Callback onStick
					if ( typeof settings.onStick == 'function' && boolStuck )
					{
						settings.onStick.call(this);
						boolStuck = false;
					}
					
					// Enable other callbacks
					boolUnstuck = true;
					boolLimit = true;
				}
			
			}
			// Unstick it !
			else
			{
				
				// Remove clone
				if( $('.'+cloneClass).size() > 0 ) $('.'+cloneClass).remove();
				
				// Unstick element
				el
				.css({
					'position': 'static',
					'top': 'auto',
					'left': 'auto'
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
				boolLimit = true;
			
			}
		
		}
		
	});
	
};