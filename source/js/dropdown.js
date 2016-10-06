$(document).ready(function() {
    var timer, selected = false;
    $(".dropdown").hover(function() {
        var dropdown = $(this);
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        if(!dropdown.hasClass("selected")){
            dropdown.addClass("selected");
            selected = true;
        }
    }, function() {
        var dropdown = $(this);
        if(dropdown.hasClass("selected") && selected) {
            timer = setTimeout(function() {
                dropdown.removeClass("selected");
                selected = false;
                clearTimeout(timer);
                timer = null;
            }, 100);
        }
    });
    $(".global-nav").click(function() {
        if ($(window).width() <= 769) {
            var gnul = $(".gnul");
            gnul.hasClass("collapse") ? gnul.removeClass("collapse") : gnul.addClass("collapse");
        }
    });
});
