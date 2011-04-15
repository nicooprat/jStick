# Stick your menu (or anything you want) to the top of the window

#### jQuery plugin

jStick is a jQuery plugin which allows you to stick your navigation bar to the top of your page when you scroll down.

------------------------------------------------------------

# Installation

1. Just load jquery.jstick.js in your HEAD
2. Initialize the plugin on the element you want. For example :

	$('#nav').jStick();	

3. Add options if you want. See below...

------------------------------------------------------------

# Options

	* class					= the class attribute given to the element when stuck (default : 'stuck')
	* shadow				= the css attribute for box-shadow ; eg : '0 3px 3px #666'. (default : false)
	* offset				= the number of pixel of offset between the element and the top of the window (default : 0)
	* opacity				= the opacity css attribute, from 0 to 1, when the element is stuck (default : 1)
	* limit					= the height at which the element should no longer be stuck (default: false)
	* onStick				= a function called when the element is stuck (default : null)
	* onUnstick				= a function called when the element is unstuck (default : null)
	* onLimitReached		= a function called when the limit parameter is reached (default : null)