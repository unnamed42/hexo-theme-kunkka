(function($) { 
// When to show the scroll link
// higher number = scroll link appears further down the page   
var upperLimit = 500;

// Our scroll link element
var scrollElem = $('#totop');

// Scroll to top speed
var scrollSpeed = 500;

// Show and hide the scroll to top link based on scroll position   
$(window).scroll(function () {
    if ( $(document).scrollTop() > upperLimit ) {
        $(scrollElem).addClass("display"); // fade back in           
    }else{
        $(scrollElem).removeClass("display"); // fade out
    }
});

// Scroll to top animation on click
$(scrollElem).click(function(){
    $('html, body').animate({scrollTop:0}, scrollSpeed); return false;
});
})(jQuery);
