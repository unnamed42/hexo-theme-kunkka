var bigfa_scroll = {
    drawCircle: function(id, percentage, color) {
        var width = $(id).width();
        var height = $(id).height();
        var radius = parseInt(width / 2.20);
        var position = width;
        var positionBy2 = position / 2;
        var bg = $(id)[0];
        id = id.split("#");
        var ctx = bg.getContext("2d");
        var imd = null;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineCap = "square";
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 3;
        imd = ctx.getImageData(0, 0, position, position);
        var draw = function(current, ctxPass) {
            ctxPass.putImageData(imd, 0, 0);
            ctxPass.beginPath();
            ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);
            ctxPass.stroke();
        }
        draw(percentage / 100, ctx);
    },
    backToTop: function($this) {
        $this.click(function() {
            $("body,html").animate({
                scrollTop: 0
            },
            800);
            return false;
        });
    },
    scrollHook: function($this, color) {
        color = color ? color: "#000000";
        $this.scroll(function() {
            var docHeight = ($(document).height() - $(window).height()),
            $windowObj = $this,
            $per = $(".percentage"),
            percentage = 0;
            defaultScroll = $windowObj.scrollTop();
            percentage = parseInt((defaultScroll / docHeight) * 100);
            var backToTop = $("#backtoTop");
            if (backToTop.length > 0) {
                if ($windowObj.scrollTop() > 200) {
                    backToTop.addClass("display");
                } else {
                    backToTop.removeClass("display");
                }
                $per.attr("data-percent", percentage);
                bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);
            }
        });
    }
};

$(function() {
    var T = bigfa_scroll,
        totop = $("#backtoTop"),
        percent = totop.children(".percentage");
    T.backToTop(totop);
    T.scrollHook($(window), "#99ccff");
    percent.hover(function(){
        percent.addClass("fa-long-arrow-up");
        percent.css({"font-family":"FontAwesome"});
    },function(){
        percent.removeClass("fa-long-arrow-up");
        percent.removeAttr("style");
    });
});
