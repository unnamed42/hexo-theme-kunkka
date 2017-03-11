$(function() {
    var totop = $("#totop"),
        canvas = $("#totop-canvas"),
        percent = $("#totop-percent"),
        width = canvas.width(),
        heigth = canvas.height(),
        radius = parseInt((width - 3) / 2),
        ctx = canvas[0].getContext("2d"),
        doc_height = $(document).height() - $(window).height();
    
    ctx.translate(width / 2, width / 2); // change center
    ctx.rotate(-1 / 2 * Math.PI); // rotate -90 deg
    function draw_circle(color, percent) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
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
    
    $(window).resize(function() {
        doc_height = $(document).height() - $(window).height();
    });
    
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop(),
            per = parseInt($(window).scrollTop() / doc_height * 100);
        if (per >= 10) {
            totop.addClass("display");
            draw_circle('#efefef', 1);
            draw_circle('#555555', per/100);
        } else
            totop.removeClass("display");
        percent.attr("data-percent", per);
    });
});





