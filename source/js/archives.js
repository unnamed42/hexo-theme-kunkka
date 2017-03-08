$(function() {
    if($(window).width() <= 768)
        return;
    
    var top = $("#content").offset().top,
        nav = $("#archive-nav");
        page_height = $("#primary").position().top + $("#primary").outerHeight(),
        nav_max = page_height - nav.height();
    var year_selected = $(".year:first"),
        month_selected = year_selected.find(".month:first");
    year_selected.addClass("selected"); month_selected.addClass("selected");
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop();
        if(scroll_top < 55) // 55 == header.height(55px)
            nav.css({top: 115 - scroll_top});
        else if(nav_max > scroll_top)
            nav.css({top: 60}); // 60 == archive-nav.top(115px) - header.height(55px)
        else
            nav.css({top: nav_max - scroll_top});
        $(".archive-title").each(function() {
            var t = $(this),
                offset = t.offset().top - 40,
                bottom = offset + t.height();
            if(offset <= scroll_top && scroll_top < bottom) {
                var id = t.attr("id"),
                    year = id.replace(/archive-(\d+)-\d+/, "$1"),
                    selected_year = year_selected.attr("id").substr(5); // remove "year-" from id
                if(year !== selected_year) {
                    year_selected.removeClass("selected");
                    year_selected = $("#year-" + year);
                    year_selected.addClass("selected");
                }
                month_selected.removeClass("selected");
                month_selected = $("#" + id.replace("archive", "month"));
                month_selected.addClass("selected");
            }
        });
    });
});
