jQuery.fn.jStick = function( settings ) {
	
	// Setting variables
	var el = 				$(this);
	var clone;
	var top =				el.offset().top;
	var left =				el.offset().left;
	var isStuck =			false;
	var isUnstuck =			false;
	var hasReachedLimit =	false;
	var frozen =			false;
	
	var defaults = { 
		class:				'stuck',
		offset:				0,
		limit:				false,
		cloneClass:			'the_clone',
		cancelIfTooHigh:	true
	};

	var opt = jQuery.extend({}, defaults, settings);
	
	// When user scrolls...
	$(window).scroll(function() {

		update();
		
		// If the element isn't higher than the window, and the element hasn't been frozen...
		if( isSmaller() && !frozen ) {
			
			// If the window has been scrolled enough...
			if ( $(this).scrollTop() > top - opt.offset )
			{
					
				// Limit reached
				if ( opt.limit && ( $(this).scrollTop() + opt.offset + el.outerHeight() > opt.limit ) )
				{
					if( !hasReachedLimit ) reachLimit();
				}
				
				// Stick it !
				else
				{
					if( !isStuck ) stick();
				}
			
			}
			
			// Unstick it !
			else
			{
				if( !isUnstuck ) unStick();
			}
			
		}
		
	});
	
	$(window).resize(update);
	
	function stick()
	{
		
		// Clone element
		cloneIt();
	
		// Stick element to top
		clone
		.css({
			'position': 'fixed',
			'top': opt.offset,
			'left': left,
			'width': el.outerWidth()
		})
		.addClass( opt.class );
		
		// Callback onStick
		if ( typeof opt.onStick == 'function' ) opt.onStick.call(this);
		
		// Enable other callbacks
		isUnstuck = false;
		hasReachedLimit = false;
		isStuck = true;
	
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
		isStuck = false;
		hasReachedLimit = false;
		isUnstuck = true;
	
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
			'left': left
		})
		.removeClass( opt.class );
		
		// Callback onLimitReached
		if ( typeof opt.onLimitReached == 'function' ) opt.onLimitReached.call(this);
			
		// Enable other callbacks
		isStuck = false;
		isUnstuck = false;
		hasReachedLimit = true;
		
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
	
	function isSmaller()
	{
		return ( ( el.outerHeight() < $(window).height() ) || !opt.cancelIfTooHigh );
	}
	
	function update()
	{
		if( isStuck && !isSmaller() )
		{
			unStick();
		}
		
		if( !hasReachedLimit && cloneExists() )
		{
			top = el.offset().top;
			left = el.offset().left;
			
			clone
			.css({
				'top': opt.offset,
				'left': left,
				'width': el.outerWidth()
			});
		}
	}
	
	this.freeze = function()
	{
		if( isStuck )
		{
			isStuck = false;
			frozen = true;
			
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
		if( !isStuck && frozen )
		{
			if( $(window).scrollTop() > top - opt.offset )
			{
				stick();
				isStuck = true;
				frozen = false;
			}
			else
			{
				unStick();
				isUnstuck = true;
				frozen = false;
			}
		}
		
		// Callback onUnfreeze
		if ( typeof opt.onUnfreeze == 'function' ) opt.onUnfreeze.call(this);
	}
	
	// Make the plugin chainable
	return this;
	
};