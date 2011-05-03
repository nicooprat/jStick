jQuery.fn.jStick = function( settings ) {
	
	// Setting variables
	var el = $(this);
	var clone;
	
	var defaults = { 
		top:				el.offset().top,
		left:				el.offset().left,
		class:				'stuck',
		offset:				0,
		isStuck:			false,
		isUnstuck:			false,
		hasReachedLimit:	false,
		limit:				false,
		cloneClass:			'the_clone',
		cancelIfTooHigh:	true
	};

	var opt = jQuery.extend({}, defaults, settings);
	
	// When user scrolls...
	$(window).scroll(function() {
	
		// If the element isn't higher than the window...
		if( ( el.outerHeight() < $(window).height() ) || !cancelIfTooHigh ) {
			
			// If the window has been scrolled enough...
			if ( $(this).scrollTop() > opt.top - opt.offset )
			{
					
				// Limit reached
				if ( opt.limit && ( $(this).scrollTop() + opt.offset + el.outerHeight() > opt.limit ) )
				{
					if( !opt.hasReachedLimit ) reachLimit();
				}
				
				// Stick it !
				else
				{
					if( !opt.isStuck ) stick();
				}
			
			}
			
			// Unstick it !
			else
			{
				if( !opt.isUnstuck ) unStick();
			}
			
		}
		
	});
	
	function stick()
	{
		
		// Clone element
		cloneIt();
	
		// Stick element to top
		clone
		.css({
			'position': 'fixed',
			'top': opt.offset,
			'left': opt.left,
			'width': el.css('width')
		})
		.addClass( opt.class );
		
		// Callback onStick
		if ( typeof opt.onStick == 'function' ) opt.onStick.call(this);
		
		// Enable other callbacks
		opt.isUnstuck = false;
		opt.hasReachedLimit = false;
		opt.isStuck = true;
	
	}
	
	function unStick()
	{
				
		// Remove clone
		if( cloneExists() ) clone.remove();
		
		// Unstick element
		el.removeClass( opt.class );
		
		// Callback onUnstick
		if ( typeof opt.onUnstick == 'function' ) opt.onUnstick.call(this);
		
		// Enable callback for sticking
		opt.isStuck = false;
		opt.hasReachedLimit = false;
		opt.isUnstuck = true;
	
	}
	
	function reachLimit()
	{
		
		// Clone element
		cloneIt();
		
		// Fix element to the limit
		clone
		.css({
			'position': 'absolute',
			'top': opt.limit - el.outerHeight(),
			'left': opt.left
		})
		.removeClass( opt.class );
		
		// Callback onLimitReached
		if ( typeof opt.onLimitReached == 'function' ) opt.onLimitReached.call(this);
			
		// Enable other callbacks
		opt.isStuck = false;
		opt.isUnstuck = false;
		opt.hasReachedLimit = true;
		
	}
	
	function cloneIt()
	{
	
		// If the clone doesn't already exists...
		if( !cloneExists() ) {
			
			clone = el
			.clone()
			.addClass( opt.cloneClass )
			.insertAfter(el);
			
			el.css({
				'visibility':'hidden'
			})
			
		}
	
	}
	
	function cloneExists()
	{
		return ( typeof clone !== 'undefined' && clone.is(':visible') );
	}
	
	// Make the plugin chainable
	return this;
	
};