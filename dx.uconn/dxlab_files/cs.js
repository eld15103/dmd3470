jQuery(document).ready(function($) {

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		
		Link Flags
		Scans all the links in the main content area, and adds icons to any links that lead to other websites, or to downloadable documents. 
		by Andrew Bacon
		May 2014
		
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	
	var url = location.href;
	var urlExploded = url.split('/');
	var site = urlExploded[2];
	var extensions = ['3g2', '3gp', 'avi', 'doc', 'docx', 'dotx', 'gif', 'jpg', 'jpeg', 'm4a', 'mid', 'midi', 'mov', 'mp3', 'mp4', 'mpg', 'odt', 'ogg', 'ogv', 'pdf', 'png', 'ppt', 'pptx', 'xls', 'xlsx', 'wav', 'wmv', 'zip', 'vsd'];

	function scanLinks(){
		if(undefined == $(this).attr('href')) return;
		var href 	= $(this).attr('href').toLowerCase();
		var img		= $(this).find('img').length;
		var base 	= null;
		var last 	= null;
		var ext 	= null;
		var flag 	= null;
//		console.log(img);
		//	if (((href.charAt(0) != '?') || (href.charAt(0) != '#')) && img == 0 ){
		if (href.charAt(0) != '#' && img == 0){
			if (href.charAt(0) != '/'){
				var hrefExploded = href.split('/');
				base = hrefExploded[2];
				
				
				//console.log('checking to see if it might be a file...')
				last = hrefExploded[hrefExploded.length-1] || '';
				var lastExploded = last.split('.');
				var lastValue = lastExploded[lastExploded.length-1];

				if (lastValue){
					//console.log('ok, so there was a dot in the last value of the url.')
					$.each(extensions, function(index, value){
						
						if (value == lastValue){
							flag = $('<span class="flag">');
							//console.log('match!')
							ext = lastValue;
							//console.log('ext:'+ext)	
							flag.append('.'+ext);
						}					
					})
				}
				if (flag != null){
					$(this).append(flag);
				}
				if (base != site && base != null) {
					
					//console.log('external link detected, adding icon...')
					// is external, and is not a named anchor tag
					var icon = '<span class="glyphicon glyphicon-new-window"></span>';
					$(this).addClass('external').append(icon);
                                        $(this).attr('rel', 'noopener'); // Prevents the external site from having a reference to the page where the link was posted
				}
			}
		}
	}
	
	// This will only scan elements in these sections of the site. 
	
	var elementsToScan = [
		'#comments',
		'#site-navigation',
		'article.page',
		'#page-sidebar'
		]
	
	$.each(elementsToScan, function(index, value){
		$(value+' a').each(scanLinks);
	});
	
	
	/* ----- 
	
		UUP Style Help
	
	----- */
	$('.uup-list .has-image').each(function(){
		//console.log('has image...');
		var text = $(this).find('.uup-text');
		var img = $(this).find('img:first');		
		//console.log(text);
		//console.log(img);
		var textHeight = text.height();
		var imgHeight = img.outerHeight();
		//console.log(textHeight);
		//console.log(imgHeight);
		
		if (imgHeight > textHeight){
			var diff = imgHeight - textHeight;
			text.css('padding-top', diff/2);
		}
	});
	$('.uup-index-table .table-has-image').each(function(){
		//console.log('has image...');
		var text = $(this).find('.uup-name');
		var img = $(this).find('.uup-table-thumbnail');
		//console.log(text);
		//console.log(img);
		var textHeight = text.height();
		var imgHeight = img.outerHeight();
		//console.log(textHeight);
		//console.log(imgHeight);
		if (imgHeight > textHeight){
			//console.log('img bigger...');
			var diff = imgHeight - textHeight;
			text.css('cssText', 'padding-bottom:'+ diff + 'px!important' );
		}
	});
	
	
	
	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
		
		Nav: Neverwrap
		Keeps navigation items from wrapping to a second line when there are too many. 
		Emulates browser tabs.  
		by Andrew Bacon
		May 2014
		
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	/*
	function calcNavWidth(){
		var width = 0
		$('#primary-nav > ul > li > a').each(function(){
			console.log('this width: '+$(this).outerWidth())
			width = width + $(this).outerWidth()
		})
		console.log('width: '+width)
		return width
	}
	
	var containerWidth 	= $('#site-navigation').outerWidth();
	console.log('containerWidth: '+containerWidth)
	
	var navWidth 			= calcNavWidth();
		
	if (navWidth > containerWidth) {
		var links = $('#primary-nav > ul > li > a').length
		console.log('links: '+links)
		var width = 100/links
		console.log('width: '+width)
		$('#primary-nav').addClass('neverwrap')
		
		
		$('#primary-nav > ul > li').each(function(){
			console.log('meep')
			$(this).width(width+'%')	
		})
		
	}
	/**/
	/*
	
	Need some kind of a way to... 
	
	when the size of each one gets too low, and is useless... 
	
	actually rewrite the markup, and place the last few categories under a "more" item. Clicking that exposes a second nav bar. 
	
	
	*/
	
	

	/* 
		
		SIMPLE ACCESSIBILITY TESTER

		by Andrew Bacon
		This plugin runs simple tests on a site, and adds distinct visual styles to flawed content when they fail. 

	*/
	function imageWarning(e){
		var block = $('<div>')
		block.addClass('alert alert-danger accessibility-fail-msg')
		//console.log(e.width())
		block.width(e.width+'px')

		var icon = $('<span>')
		icon.addClass('glyphicon glyphicon-ban-circle')

		var msg = $('<span>')
		msg.append(' This image needs a <a href="http://aurora.uconn.edu/accessibility">valid Alt tag.</a> ')


		block.append(icon).append(msg)
		$(e).after(block)
	}
	$('#page img').each(function(){
		if($(this).closest('.ms-youtube').length > 0) return;
		var alt = $(this).attr('alt')
		if (undefined != alt){
			//if(alt.length == 0 && (undefined == $(this).attr('role') || $(this).attr('role')!='presentation')){
			//		var data = {
			//			'action': 'report_blank_alt',
			//			'location': window.location.href,
			//			'image': $(this).attr('src')
			//		};
					// We can also pass the url value separately from ajaxurl for front end AJAX implementations
					//jQuery.post(ajax_object.ajax_url, data, function(response) {
					//});
			//}
			alt = alt.toLowerCase()
			//console.log('alt='+alt)	
			if (alt.indexOf('.jpg') >= 0 || alt.indexOf('.png') >= 0 || alt.indexOf('.gif') >= 0 ){
				$(this).addClass('accessibility-fail')
				imageWarning(this)
			}
		} else {
			$(this).addClass('accessibility-fail')			
			imageWarning(this)
		}
	})
	// adds default bootstrap styles to all tables. 
	$('#page table').each(function(){
		$(this).addClass('table');
	})

	/**/



// STICKY FOOTER
// measures height of the page, and applies a class to absolute position the footer, or not. 
// on short pages, it sticks; on tall pages, it doesn't. 

function stickyFoot(){
	if (document.getElementById('page')!=null && document.getElementById('footers') !=null){
		$('body').removeClass('sticky');
		var wrapperH = $('#page').outerHeight();
		var wpadminbarH = $('#wpadminbar').outerHeight();
		var ucheaderH = $('#uc-header').outerHeight();
		var footerH = $('#footers').outerHeight();
		var windowH = window.innerHeight;
		var gformH = 0;
		$('.gform_wrapper').each(function(){
			gformH = gformH + $(this).outerHeight();
		});
		windowH = windowH - wpadminbarH - ucheaderH;
        if($( "body > ul.alerts" ).length){
		  var alertH = $( "body > ul.alerts" ).outerHeight();
		  windowH = windowH - alertH;
        }
        if($( "body > div.uconn-health-alerts" ).length){
		  var alertH = $( "body > div.uconn-health-alerts" ).outerHeight();
		  windowH = windowH - alertH;
        }
		if(windowH>=wrapperH){
			$('body').addClass('sticky');
		}
	}
}
function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}


// UC People Styling

function squareImg(img){
	
};

/*
	Filter Functionality for the A-Z Index
	
	The function will hide any text that does not match the filter input and remove letters
	if there are no matches for that letter.
*/
	var filterEvent = null;
	
	$("#azFilterInput").keyup(function(){
		azFilter();
	});
	
	function azFilter(){
		var filterInput = $("#azFilterInput").val();
		
		// Show everything that could have been hidden
		$(".az-letter:hidden, .az-letter-list li:hidden").each(function(){
			$(this).show();
		});
		
		if(filterInput !== ""){
			// Select any az-letter-page class where the text does not match the regular expression
			$("a.az-letter-page").filter( function(i){ return $(this).html().match(new RegExp(filterInput, "i")) === null }).each(function(){
				$(this).parent("li").hide();
				var numberOfVisibleListItems = $(this).parents(".az-letter-list").children("li:visible").length;
				
				// If there are no visible list items for a letter than we will hide the whole div
				if(numberOfVisibleListItems === 0){
					$(this).parents(".az-letter").hide();
				}
			});
		}
	}

/* ========================================= */

$(document).ready(function(){ 
	stickyFoot();
});
$(window).resize(function() {
	stickyFoot();
});
$(window).load(function() {
	stickyFoot();
});
$(window).ready(function() {
	
});


onElementHeightChange(document.body, function(){
    stickyFoot();
});

$('.panel, .collapse').on('shown.bs.collapse', function (e) {
   stickyFoot();
})
$('.panel, .collapse').on('hidden.bs.collapse', function (e) {
   stickyFoot();
})


//$(document).ready(function() {
 //   $('#uc-header .container').fadeIn('slow'); 
//});

	
	$('#skip-to-tawkto').click(function(){
		if (typeof Tawk_API != "undefined"){
			Tawk_API.maximize();
			$("iframe[title='chat widget']").first().focus();
		}
	});
	
});

var urlParametersGlobal = {};
function csClearURLSearchParameter(){
    urlParametersGlobal = {};
    window.history.replaceState(null, null, window.location.pathname); // clear search parameters
//    console.log(urlParametersGlobal);
}

function csUpdateURLSearchParameter(varName, value){
    if(value){
        urlParametersGlobal[varName] = value;
    }
//    console.log(urlParametersGlobal);
}
        
function csWriteSearchParameter(){
    let urlSearchParams = "";

    for(var key in urlParametersGlobal){
        if(urlSearchParams){
            urlSearchParams += "&" + key + "=" + urlParametersGlobal[key];
        } else {
            urlSearchParams += "?" + key + "=" + urlParametersGlobal[key];
        }
    }
    if(urlSearchParams){
        window.history.replaceState({}, "", urlSearchParams);
    }
}