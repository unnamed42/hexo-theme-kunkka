$(function() {
    var totop = $("#totop"),
        canvas = $("#totop-canvas"),
        percent = $("#totop-percent"),
        width = canvas.width(),
        height = canvas.height(),
        center = width / 2,
        radius = parseInt((width - 3) / 2),
        ctx = canvas[0].getContext("2d");
    function draw_circle(color, percent) {
        ctx.beginPath();
        ctx.arc(center, center, radius, - Math.PI / 2, Math.PI * 1.5 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    totop.click(function() {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
    });
    
    $(window).scroll(function() {
        var doc_height = $(document).height() - $(window).height(),
            per = parseInt($(window).scrollTop() / doc_height * 100);
        if (per >= 8) {
            totop.addClass("display");
            ctx.clearRect(0, 0, width, height);
            draw_circle('#efefef', 1);
            draw_circle('#555555', per/100);
        } else
            totop.removeClass("display");
        percent.attr("data-percent", per);
    });
});
