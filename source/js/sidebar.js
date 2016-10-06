$(document).ready(function() {
    $(".widget.widget-links").load("/components/links.html");
    
    $(".widget.recent-posts").load("/components/recent-posts.html", function(response, status) {
        if ("success" === status) {
            var update_time = $(this).find("span.update-time"),
                suffix = $(this).find("ul.list").attr("data-suffix"),
                now = new Date().getTime();
            update_time.each(function() {
                var time = new Date($(this).attr("data-date")).getTime(),
                    diff = Math.ceil((now - time) / 864e5);
                if(10 >= diff)
                    $(this).html(diff + suffix);
            })
        }
    });
});
