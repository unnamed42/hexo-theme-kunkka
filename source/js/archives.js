$(function() {
    if($(window).width() <= 768)
        return;
    
    var top = $("#content").offset().top,
        nav = $("#archive-nav"),
        page_height = $("#primary").position().top + $("#primary").outerHeight(),
        nav_max = page_height - nav.height();
    var year_active = $(".year:first"),
        month_active = year_active.find(".month:first"),
        headers = $(".archive-title");
    year_active.addClass("active"); month_active.addClass("active");
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop();
        if(scroll_top < 55) // 55 == header.height(55px)
            nav.css({top: 115 - scroll_top});
        else if(nav_max > scroll_top)
            nav.css({top: 60}); // 60 == archive-nav.top(115px) - header.height(55px)
        else
            nav.css({top: nav_max - scroll_top});
        headers.each(function() {
            var t = $(this),
                offset = t.offset().top - 40,
                bottom = offset + t.height();
            if(offset <= scroll_top && scroll_top < bottom) {
                var id = t.attr("id"),
                    year = id.replace(/archive-(\d+)-\d+/, "$1"),
                    active_year = year_active.attr("id").substr(7); // remove "anchor-" from id
                if(year !== active_year) {
                    year_active.removeClass("active");
                    year_active = $("#anchor-" + year);
                    year_active.addClass("active");
                }
                month_active.removeClass("active");
                month_active = $("#" + id.replace("archive", "anchor"));
                month_active.addClass("active");
                return false; // terminate loop
            }
        });
    });
});
