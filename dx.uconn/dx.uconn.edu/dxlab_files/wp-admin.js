function onPageExist(newLink) {
    var $ = jQuery;
    // Actions when duplicate page is found.
    //alert("Page:  " + link + "\nis in the menu! No duplicate links are allowed.");
    $.colorbox({
        width:"50%", 
        html:"<p><strong>Duplicate Links Detected.</strong></p>\
              <p>Each link can only appear once in the Primary Menu. Following link is already in the Primary Menu:</p>\
              <ul style='list-style:disc;margin-left:15px;'>\
                <li>" + newLink + "</li>\
              </ul>\
              <p>No links are added.</p>"
    });
}

function onPageDuplicate(menuLinks) {
    var $ = jQuery;
    // Actions when duplicate page is found.

    // Create duplicate link list
	var html = "<ul style='list-style:disc;margin-left:15px;'>";
	for (var i in menuLinks.duplicates.page) {
		html += "<li>" + "<strong>" + menuLinks.duplicates.page[i] + "</strong></li>";
	}
	for (var i in menuLinks.duplicates.custom) {
		html += "<li>" + "<strong>" + menuLinks.duplicates.custom[i] + "</strong></li>";
	}
	for (var i in menuLinks.duplicates.category) {
		html += "<li>" + "<strong>" + menuLinks.duplicates.category[i] + "</strong></li>";
	}
	html += "</ul>";
    html = "<p><strong>Duplicate Links Detected.</strong></p>\
              <p>Each link can only appear once in the Primary Menu. Please remove any duplicate links until there is only one instance of each of the following links:</p>" 
              + html + 
              "<p>You will not be able to save any changes to the Primary Menu until these duplicate links have been removed.</p>";
    $.colorbox({
        width:"50%", 
        html:html
    });
}

function validateNewPage(newlink, link_dic, link_to_menu_map){
    // Validate new page. 
    if (newlink in link_dic) {
        onPageExist(newlink, link_to_menu_map[newlink]);
        return false;
    }
    return true;
}

function onAddingCheckedMenuItems(id, link_dic, link_to_menu_map){
    var $ = jQuery;
    var validate_result = true;
    $('#' + id).find('[type="checkbox"]').each(function(index, el) {
        if (el.checked) {
            var menu_item_url = $(el).closest("li").find(".menu-item-url");
            if (menu_item_url != null) {
                var newlink = menu_item_url.attr("value");
                validate_result = validateNewPage(newlink, link_dic, link_to_menu_map);
                if (validate_result === false) {
                    return false;
                }
            }
        }
    });
    
    return validate_result;
}

function updateCheckedMenuItemsStatus(page, category) {
    var $ = jQuery;
    $('#add-post-type-page').find('[type="checkbox"]').each(function(index, el) {
		//console.log($(el).val());
        var menu_item = $(el).val();
        if (menu_item != null) {
            if (menu_item in page) {
                el.disabled = true;
                el.checked = false; // Set to unchecked to prevent it from being added again.
            } else {
                el.disabled = false;
            }
        }
    });
    $('#add-category').find('[type="checkbox"]').each(function(index, el) {
        var menu_item = $(el).val();
        if (menu_item != null) {
            if (menu_item in category) {
                el.disabled = true;
                el.checked = false; // Set to unchecked to prevent it from being added again.
            } else {
                el.disabled = false;
            }
        }
    });
}

function markElement(el, is_mark) {
    var $ = jQuery;
    if (is_mark) {
        $(el).css("color", "red");
    } else {
        $(el).css("color", "rgb(51,51,51)");
    }
}

function retrieveMenuLinks() {
    var $ = jQuery;
	var page = {};
	var custom = {};
	var category = {};
	var duplicates = {'page':{}, 'custom':{}, 'category':{}};
    $('#menu-to-edit > li').each(function(index, el){
        var itemType = $(el).find(".menu-item-data-object").val();
        if(itemType == 'page'){
        	var itemId = $(el).find(".menu-item-data-object-id").val();
			if(itemId in page){
				duplicates['page'][itemId] = $(el).find(".edit-menu-item-title").val();
			}
			else{
				page[itemId] = true;
			}
		}
		else if(itemType == 'custom'){
        	var itemURL = $(el).find(".edit-menu-item-url").val();
			if(itemURL != '#'){
				if(itemURL in custom){
					duplicates['custom'][itemURL] = $(el).find(".edit-menu-item-title").val();
				}
				else{
					custom[itemURL] = true;
				}
			}
		}
		else if(itemType == 'category'){
        	var itemId = $(el).find(".menu-item-data-object-id").val();
			if(itemId in category){
				duplicates['category'][itemId] = $(el).find(".edit-menu-item-title").val();
			}
			else{
				category[itemId] = true;
			}
		}
    });
	return {
        'page':page,
		'custom':custom,
		'category':category,
		'duplicates':duplicates
    };
}

function addMenuLink(newlink, el, link_dic, link_to_menu_map) {
    link_dic[newlink] = 1;
    
    // Create link to menu item entry
    link_to_menu_map[newlink] = el;
}

function deleteMenuLink(deletedLink, link_dic, link_to_menu_map) {
    if (--link_dic[deletedLink] == 0) {
        delete link_dic[deletedLink];    
        // Delete link to menu item entry
        delete link_to_menu_map[deletedLink];
    }
}

/*
function appendColorBoxPlugin() {
    // Create colorbox script.
    var colorBoxScript = document.createElement('script');
    colorBoxScript.src = 'http://development.wordpress.uconn.edu/wp-content/plugins/uc-admin-themes/jquery.colorbox.js';
    colorBoxScript.type = 'text/javascript';
    
    // Create colorbox css style.
    var colorBoxCSS = document.createElement('link');
    colorBoxCSS.rel = 'stylesheet';
    colorBoxCSS.media = 'screen';
    colorBoxCSS.type = 'text/css'
    colorBoxCSS.href = 'http://development.wordpress.uconn.edu/wp-content/plugins/uc-admin-themes/colorbox.css';
    
    // Append script and css style to document.
    document.getElementsByTagName('head')[0].appendChild(colorBoxCSS);
    document.getElementsByTagName('head')[0].appendChild(colorBoxScript);
}
*/
jQuery(document).ready(function($){
	
	// Hide the manage sidebars stuff (temp)
	/*
	$('#menu-appearance .wp-submenu a').each(function(){
		var href= $(this).attr('href');
		if (href == 'themes.php?page=uc_sidebars') {
			$(this).hide();
			console.log(href);
		}
	});
	*/
	
    //Change the UCONN AURORA link.
    //$('#wp-admin-bar-wp-logo a').attr('href','http://aurora.uconn.edu'); //No longer needed, done in uc-admin-themes
    
    //Append colorbox jquery plugin
  //  appendColorBoxPlugin();
    
    // Disallow adding duplicate pages to NAV menu.
    var pagePath = window.location.pathname;
    var pageName = pagePath.substring(pagePath.lastIndexOf('/') + 1);
    if (pageName === "nav-menus.php" && $('#locations-primary').prop('checked')) {
        // Retrieve current menu links.
        var menuLinks = retrieveMenuLinks();
        
        // Update all checkbox status
        updateCheckedMenuItemsStatus(menuLinks.page,menuLinks.category);
        
        // Capture Save Menu action to check existing duplicate links.
        $("#update-nav-menu").find('[type="submit"]').on('click', function(event) {
        	var menuLinks = retrieveMenuLinks();
            if (!jQuery.isEmptyObject(menuLinks.duplicates.page) || !jQuery.isEmptyObject(menuLinks.duplicates.custom) || !jQuery.isEmptyObject(menuLinks.duplicates.category)) {
                onPageDuplicate(menuLinks);
                return false;
            }
            return true;
        });
		
		//Prevent adding duplicate custom links
		$('#submit-customlinkdiv').on('click', function(event){
			var menuLinks = retrieveMenuLinks();
			var newLink = $('#custom-menu-item-url').val();
			if(newLink in menuLinks.custom){
				onPageExist(newLink);
				return false;
			}
			return true;
		});
		
		// Monitor adding new link event
        $("#menu-to-edit").on('DOMNodeInserted', function(event) {
			// Retrieve current menu links.
			var menuLinks = retrieveMenuLinks();
			// Update all checkbox status
			updateCheckedMenuItemsStatus(menuLinks.page,menuLinks.category);
        });
        
        // Monitor deleting link event
        $(".menu-item").on('remove', function(event) {
			// Retrieve current menu links.
			var menuLinks = retrieveMenuLinks();
			var itemType = $(this).find(".menu-item-data-object").val();
			if(itemType == 'page'){
				var itemId = $(this).find(".menu-item-data-object-id").val();
				if(!(itemId in menuLinks.duplicates.page)){
					delete menuLinks.page[itemId];
				}
			}
			else if(itemType == 'category'){
				var itemId = $(el).find(".menu-item-data-object-id").val();
				if(!(itemId in menuLinks.duplicates.category)){
					delete menuLinks.category[itemId];
				}
			}
			// Update all checkbox status
			updateCheckedMenuItemsStatus(menuLinks.page,menuLinks.category);
        });
    }
	
	if( pageName == 'options-general.php' ){
		$('p#new-admin-email-description').html('This address is used for admin purposes');
	}
	
	//Hide Meta Slider html tabs
	//$('.slide.layer_slide').each(function(){
	//	$($(this).children('.col-2').children('.tabs').children().get(3)).css('display','none');
	//});
	$('.slide.post_feed').each(function(){
		$($(this).children('.col-2').children('.tabs').children().get(0)).css('display','none');
		$($(this).children('.col-2').children('.tabs').children().get(1)).addClass('selected');
		$($(this).children('.col-2').children('.tabs-content').children().get(0)).css('display','none');
	});
	
	
	//Hide empty widget areas on Widgets page
	$('.widgets-holder-wrap').each(function(){
		if($(this).children().first().css('display') == 'none'){
			$(this).css('display','none');
		}
	});
	
	//Disable email edit field
	$('.user-edit-php #email, .profile-php #email').attr('readonly','readonly');
	
	// hide the Visual Editor on the user-edit.php page
	$('.user-rich-editing-wrap').hide();
	
	//
	// Hide the 2 links on the page builder page
	//
	$("body").on("click",".so-prebuilt-add",function(e) {
		$('.so-sidebar-tabs li').each(function(i,e){
			if( $(this).children('a').attr('href') == '#import'){
				$(this).next().children('a').click();
				$(this).remove();
			}
		});
	}); 
	$('.widgets-php #header-widget-area .description').each(function(){
		$(this).html($(this).html().replace('header widget area guide','<a target="_blank" href="http://aurora.uconn.edu/2016/12/28/header-widget-area/">header widget area guide</a>'));
	});
        
        // Remove the advertisement from the Velvet Blues Update URLs tools page
        $("body.tools_page_velvet-blues-update-urls div.wrap form").next('p').remove();
        
        // Remove advertisement from WP GA Events
        $(".ga_events_featurebox").remove();
        $(".ga_events_sidebar").remove();
        
        // Remove advertisement from Replace Media Upload page
        $("div[style='background: #fff;width: 250px;min-height: 270px;border: 1px solid #ccc;float: right;padding: 15px;margin: 0 0 10px;']").remove();
        
        // Remove advertisement from Aryo Activity Log
        $(".aal-install-elementor").remove();
        
        // Remove Visualizer Datatracking popup
        $("#visualizer_logger_flag-notification").remove();
});