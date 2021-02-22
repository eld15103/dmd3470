jQuery(document).ready(function( $ ) {
	if ($("#masthead .col-sm-4 .widget")[0]){ //if a widget exists in the header area
			$("#masthead .col-sm-4 .searchform").hide(); // hide default search
			$("#masthead .col-sm-4").removeClass( "col-sm-4" ).addClass( "col-sm-6" ); // make old search wrapper larger
			$("#masthead .col-sm-8").removeClass( "col-sm-8" ).addClass( "col-sm-6" ); //change site title area since search area is now larger
			$("#masthead .col-sm-6 .widget .searchform").show(); // allow search widget to be showed when added to search area
			
			var $widget = $('#masthead .col-sm-6 .widget');  
				$widget.css('width',(100/$widget.length).toString()+'%'); 
				//$widget.css('width', '50%'); 
				
			var $widgetMenuHeight = $('#masthead .col-sm-6 .widget .menu'); //Center menu widget
				$widgetMenuHeight.css('margin-top', ($('#uc-site-header').outerHeight() - $('#masthead .col-sm-6 .widget .menu li a').outerHeight())/2); 
				
	} else { //if no widget exists 
		$("#masthead .col-sm-4.widget").removeClass("col-sm-4").hide();
	}
	
	
});