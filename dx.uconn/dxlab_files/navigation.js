/**
 * navigation.js
 *
 */ 
 
jQuery(document).ready(function($) {
	
	function replaceAnchors(selector) {
		$(selector).each(function(){
			var atag = $(this).children('a');
			var newhref = getFirstLink(this);
			atag.attr('href',newhref);
		});
	}
	function getFirstLink(element){
		var href = $(element).children('a').attr('href');
        if(typeof href == 'undefined') return href;
		if(href == '#'){
			var firstChild = $(element).children('ul').children('li').first();
			if(firstChild.length == 0){
				return href;
			}
			else {
				return getFirstLink(firstChild);
			}
		}
		else {
            //If the current page matches the link then we don't need to change the link, fixes a bootstrap bug
	        if(window.location.href.split('#')[0] == href.split('#')[0]){
                return '#';
            }
            else{
                return href;
            }
		}
	}
	
	replaceAnchors('.menu-item-has-children');
	
});
 
/*
 * Handles toggling the navigation menu for small screens.
 *
( function() {
	var container, button, menu;

	container = document.getElementById( 'site-navigation' );
	if ( ! container )
		return;

	button = container.getElementsByTagName( 'button' )[0];
	if ( 'undefined' === typeof button )
		return;

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) )
		menu.className += ' nav-menu';

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) )
			container.className = container.className.replace( ' toggled', '' );
		else
			container.className += ' toggled';
	};
} )();
*/