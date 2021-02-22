jQuery(document).ready(function ($) {
    var accordions = [];
    var accordions_layout = [];
    $('.uc-accordion').each(function () {
        accordions[$(this).closest('.panel-grid-cell').attr('id')] = [[]];
    });
    
    var group = 0;
    for (id in accordions) {
        
        group = 0;
        $('#' + id).children(".so-panel").each(function () {
            // Visual Editor
            if ($(this).hasClass('widget_black_studio_tinymce') && $(this).find('.uc-accordion').length > 0) {
                let pgc_id = $(this).attr('id');
                if ($.inArray(pgc_id, accordions[id][group]) == -1) {
                    accordions[id][group].push(pgc_id);
                }
            // Page Builder
            } else if ($(this).prev().hasClass('uc-accordion')) {
                let pgc_id = $(this).attr('id');
                if ($.inArray(pgc_id, accordions[id][group]) == -1) {
                    accordions[id][group].push(pgc_id);
                }
            } else {
//                console.log("empty array push!");
                accordions[id].push([]);
                group++;
            }
        });
    }
    
    count = 0;
    for (cell in accordions) {
        for (group in accordions[cell]) {
            var id = '';
            count++;
            for (panel in accordions[cell][group]) {
                var title_obj = $('#' + accordions[cell][group][panel]).prev('.uc-accordion');
                var title = title_obj.html();
                if (title == null || title == undefined) {
                    var title_obj = $('#' + accordions[cell][group][panel] + ' .uc-accordion');
                    var title = title_obj.html();

                    if (title == null) {
                        continue;
                    }
                }
                
                title_obj.remove();
                
                var panel_obj = $("#" + accordions[cell][group][panel]);
                var content = "";
                
                // Visual Editor
                if(panel_obj.hasClass("widget_black_studio_tinymce")){
                    content = $('#' + accordions[cell][group][panel] + ' .textwidget').html();
                }
                
                // Layout Builder
                if(panel_obj.hasClass("widget_siteorigin-panels-builder")){
                    var content_obj = $('#' + accordions[cell][group][panel] + ' div.panel-layout');
                    
                    if(content_obj.length == 0){
                        continue;
                    }
                    
                    content_obj.find(".panel-grid-cell").each(function(){
                        $(this).removeClass('panel-grid-cell');
                        $(this).addClass('panel-grid-cell-target');
                    });
                    
                    content = content_obj.html();
                }

                if (content == "" || content == null || content == undefined) {
                    continue;
                }
                
                $('#' + accordions[cell][group][panel]).prev('.uc-accordion').remove();
                if (panel > 0) {
                    $('#' + accordions[cell][group][panel]).remove();
                } else {
                    $('#' + accordions[cell][group][panel]).empty();
                    id = accordions[cell][group][panel];
                    
                    $('#' + id).append('<div id="accordion' + count + '" class="accordion panel-group"></div>');
                }
                $('#' + id + ' .accordion').append('<div class="panel panel' + panel + ' panel-default"><div class="panel-heading"><h4 class="panel-title"><a class="collapsed" href="#collapse' + id + panel + '" data-toggle="collapse" data-parent="#accordion' + count + '"></a></h4></div><div id="collapse' + id + panel + '" class="panel-collapse collapse"><div class="panel-body"></div></div></div>');
                $('#' + id + ' .panel' + panel + ' .panel-title a').append(title);
                $('#' + id + ' .panel' + panel + ' .panel-body').append(content);
                if (window.location.hash.length > 0 && window.location.hash.substr(1) == 'collapse' + id + panel) {
                    $('#collapse' + id + panel).addClass('in');
                }
            }
        }
    }

    // Collect Site Origin Page Builder panels
    $('.uc-accordion-layout').each(function () {
        let accordionPanelID = $(this).next().attr('id');
        accordions_layout[accordionPanelID] = {};
        accordions_layout[accordionPanelID].title = $(this).html();
        accordions_layout[accordionPanelID].panel = $(this).next().find("div[id^='panel-']").attr('id');
        accordions_layout[accordionPanelID].content = $(this).next().find("div[id^='panel-']").html();
        $(this).remove();
    });

    for (id in accordions_layout) {

        count++;
        let panel = accordions_layout[id].panel;
        let title = accordions_layout[id].title;
        $('#' + panel).empty();
        $('#' + panel).append('<div id="accordion' + count + '" class="accordion panel-group"></div>');
        $('#' + panel + " .accordion").append('<div class="panel panel' + panel + ' panel-default"><div class="panel-heading"><h4 class="panel-title"><a class="collapsed" href="#collapse' + id + panel + '" data-toggle="collapse" data-parent="#accordion' + count + '"></a></h4></div><div id="collapse' + id + panel + '" class="panel-collapse collapse"><div class="panel-body"></div></div></div>');
        $('#' + id + ' .panel' + panel + ' .panel-title a').append(title);
        $('#' + id + ' .panel' + panel + ' .panel-body').append(accordions_layout[id].content);
    }

});