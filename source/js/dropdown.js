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
        // to make this still effective on window resize,
        // don't put the if-condition below out of click listener
        if ($(window).width() < 768) {
            $(this).children(".gnul").toggleClass("collapse");
        }
    });
});
