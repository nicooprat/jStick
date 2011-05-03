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
		cancelIfTooHigh:	true,
		frozen:				false
	};

	var opt = jQuery.extend({}, defaults, settings);
	
	// When user scrolls...
	$(window).scroll(function() {
	
		// If the element isn't higher than the window, and the element hasn't been frozen...
		if( ( ( el.outerHeight() < $(window).height() ) || !cancelIfTooHigh ) && !opt.frozen ) {
			
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
		el
		.css({
			'visibility': ''
		})
		.removeClass( opt.class );
		
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
			
			// Create a clone from the element
			clone = el
			.clone()
			.addClass( opt.cloneClass )
			.insertAfter(el);
			
			// Hide the element
			el.css({
				'visibility':'hidden'
			})
			
		}
	
	}
	
	function cloneExists()
	{
		// The clone hasn't been created or has been removed
		return ( typeof clone !== 'undefined' && clone.is(':visible') );
	}
	
	this.freeze = function()
	{
		if( opt.isStuck )
		{
			opt.isStuck = false;
			opt.frozen = true;
			
			clone
			.css({
				'position': 'absolute',
				'top': clone.offset().top,
				'left': clone.offset().left
			})
		}
		
		// Callback onFreeze
		if ( typeof opt.onFreeze == 'function' ) opt.onFreeze.call(this);
	}
	
	this.unFreeze = function()
	{
		if( !opt.isStuck && opt.frozen )
		{
			if( $(window).scrollTop() > opt.top - opt.offset )
			{
				stick();
				opt.isStuck = true;
				opt.frozen = false;
			}
			else
			{
				unStick();
				opt.isUnstuck = true;
				opt.frozen = false;
			}
		}
		
		// Callback onUnfreeze
		if ( typeof opt.onUnfreeze == 'function' ) opt.onUnfreeze.call(this);
	}
	
	// Make the plugin chainable
	return this;
	
};