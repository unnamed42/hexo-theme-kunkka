$(function() {
    if ($(window).width() > 768) {
        var top = $("#content").offset().top,
            year_selected = parseInt($(".year:first").attr("id").replace("year-", ""));
        $(".year:first, .year .month:first").addClass("selected");
        $(".month.monthed").click(function() {
            var t = $(this),
                id = "#" + t.attr("id").replace("mont", "arti");
            if(!t.hasClass("selected")){
                // reuse id to store its offset
                id = $(id).offset().top - 10;
                $(".month.monthed.selected").removeClass("selected");
                t.addClass("selected");
                $("body, html").scrollTop(id);
            }
        });
        $(".year-toogle").click(function(e) {
            e.preventDefault();
            var parent = $(this).parent();
            if (!parent.hasClass("selected")) {
                var s = parent.children("ul").children("li").eq(0);
                $(".year.selected").removeClass("selected");
                parent.addClass("selected");
                s.click();
            }
        });
        $(window).scroll(function() {
//             var scroll_top = $(this).scrollTop();
//             if(scroll_top >= top + 60)
//                 $(".archive-nav").css({top: 60});
//             else
//                 $(".archive-nav").css({top: top + 60 - scroll_top});
            var scroll_top = $(window).scrollTop();
            if(scroll_top < 55) // 55 == header.height(55px)
                $("#archive-nav").css({top: 115 - scroll_top});
            else
                $("#archive-nav").css({top: 60}); // 35 == archive-nav.top(115px) - header.height(55px)
            $(".archive-title").each(function() {
                var t = $(this),
                    id = t.attr("id"),
                    year = parseInt(id.replace(/arti-(\d*)-\d*/, "$1")),
                    offset = t.offset().top - 40,
                    bottom = offset + t.height();
                if(offset <= scroll_top && scroll_top < bottom) {
                    if(year != year_selected) {
                        $("#year-" + year_selected).removeClass("selected");
                        $("#year-" + year).addClass("selected");
                        year_selected = year;
                    }
                    id = "#" + id.replace("arti", "mont");
                    $(".month.monthed.selected").removeClass("selected");
                    $(id).addClass("selected");
                }
            });
        });
    }
});
