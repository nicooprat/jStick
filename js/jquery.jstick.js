jQuery.fn.jStick = function( settings ) {
	
	// Setting variables
	var el = $(this);
	var top = el.offset().top;
	var left = el.offset().left;
	
	var defaults = { 
		top:				el.offset().top,
		left:				el.offset().left,
		class:				'stuck',
		offset:				0,
		boolStuck:			false,
		boolUnstuck:		false,
		boolLimit:			true,
		limit:				false,
		cloneClass:			'the_clone',
		cancelIfTooHigh:	true
	};

	var opt = jQuery.extend({}, defaults, settings);
	
	// When user scrolls...
	$(window).scroll(function() {
	
		if( ( el.outerHeight() < $(window).height() ) || !cancelIfTooHigh ) {
		
			if ( $(this).scrollTop() > opt.top - opt.offset )
			{
				// Limit reached
				if ( opt.limit && $(this).scrollTop() + opt.offset + el.outerHeight() > opt.limit )
				{
					// Fix element to the limit
					el
					.css({
						'position': 'absolute',
						'top': opt.limit - el.outerHeight(),
						'left': opt.left
					})
					.addClass( opt.class );
					
					// Callback onLimitReached
					if ( typeof opt.onLimitReached == 'function' && opt.boolLimit )
					{
						opt.onLimitReached.call(this);
						opt.boolLimit = false;
					}
						
					// Enable other callbacks
					opt.boolStuck = true;
					opt.boolUnstuck = true;
				}
				// Stick it !
				else
				{
					// Clone element
					if( $('.'+opt.cloneClass).size() === 0 ) {
						
						el
						.clone()
						.addClass(opt.cloneClass + ' ' + opt.class)
						.css({
							'visibility':'hidden'
						})
						.insertBefore(el);
						
					}
					
					// Stick element to top
					el
					.css({
						'position': 'fixed',
						'top': opt.offset,
						'left': opt.left,
						'width': el.css('width')
					})
					.addClass( opt.class );
					
					// Callback onStick
					if ( typeof opt.onStick == 'function' && opt.boolStuck )
					{
						opt.onStick.call(this);
						opt.boolStuck = false;
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
				if( $('.'+opt.cloneClass).size() > 0 ) $('.'+opt.cloneClass).remove();
				
				// Unstick element
				el
				.css({
					'position': 'static',
					'top': 'auto',
					'left': 'auto',
					'width': ''
				})
				.removeClass( opt.class );
				
				// Callback onUnstick
				if ( typeof opt.onUnstick == 'function' && opt.boolUnstuck )
				{
					opt.onUnstick.call(this);
					opt.boolUnstuck = false;
				}
				
				// Enable callback for sticking
				opt.boolStuck = true;
				opt.boolLimit = true;
			
			}
		
		}
		
	});
	
};