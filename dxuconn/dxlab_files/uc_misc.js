jQuery(document).ready(function($){
    //
    // Grab each RSS Feed LINK and add an target=_blank attribute to the element
    // so that each link opens in a new window
    //
    // <a href ... class='rsswidget'
    //	
	$("a.rsswidget").each(function(){
		$(this).attr( 'target', '_blank' );
		}
	);

	//Add a responsive table wrapper if it doesn't already have one
	$('#content table').each(function(){
		if(!$(this).parent().hasClass('table-responsive'))
			$(this).wrap('<div class="table-responsive"></div>');
	});
	
    // Change any date pickers to start the week with Sunday
    if(typeof(gform) !== 'undefined'){
        gform.addFilter( 'gform_datepicker_options_pre_init', function( optionsObj, formId, fieldId ) {
            optionsObj.firstDay = 0;
            return optionsObj;
        });
    }
    
    //COVID Banner Click
    $('ul.alerts a').click(function(){
        beehive_ga('send', 'event', {
            eventCategory: 'Banner Link',
            eventAction: 'click',
            eventLabel: event.target.href
        });
    });
    
    //Scroll properly if a page has an accordion
	$(window).load(function(){
		if($('.uc-accordion').length > 0 && window.location.hash.length > 0) {
			window.scrollTo(0, $(window.location.hash).offset().top);
		}
	});
});

/*Bridge between the WP GA Events and the Google Analytics plugin
if( typeof ga === 'undefined' && typeof _gaq === 'undefined' && typeof __gaTracker !== "function" ){
	var ga = function(send, event, category, action, label, event_value = false, event_bounce = false){
		if(!event_bounce){
			var params = {
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				'nonInteraction': event_value.nonInteraction
			};
		}
		else{
			var params = {
				eventCategory: category,
				eventAction: action,
				eventLabel: label,
				eventValue: event_value,
				'nonInteraction': event_bounce['nonInteraction']
			};
		}
		beehive_ga('single.send', 'event', params);
	}
}*/