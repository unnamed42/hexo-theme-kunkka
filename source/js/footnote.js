// this script requires jQuery
$(document).ready(function() {
    Footnotes.setup();
});

var Footnotes = {
    footnotetimeout: false,
    setup: function() {
        var footnotelinks = $("a[rel='footnote']")
        
        footnotelinks.unbind('mouseenter',Footnotes.footnoteover);
        footnotelinks.unbind('mouseleave',Footnotes.footnoteoout);
        
        footnotelinks.bind('mouseenter',Footnotes.footnoteover);
        footnotelinks.bind('mouseleave',Footnotes.footnoteoout);
    },
    footnoteover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        $('#fn-pop').stop();
        $('#fn-pop').remove();
        
        var id = $(this).attr('href').substr(1);
        var position = $(this).offset();
    
        var div = $(document.createElement('div'));
        div.attr('id','fn-pop');
        div.bind('mouseenter',Footnotes.divover);
        div.bind('mouseleave',Footnotes.footnoteoout);

        var el = document.getElementById(id);
        div.html($(el).html());
        div.find("a[rev='footnote']").remove();
        
        $(document.body).append(div);
        
        var left = position.left;
        if(left + 420  > $(window).width() + $(window).scrollLeft())
            left = $(window).width() - 420 + $(window).scrollLeft();
        var top = position.top+20;
        if(top + div.height() > $(window).height() + $(window).scrollTop())
            top = position.top - div.height() - 15;
        div.css({
            left:left,
            top:top
        });
    },
    footnoteoout: function() {
        Footnotes.footnotetimeout = setTimeout(function() {
            $('#fn-pop').animate({
                opacity: 0
            }, 600, function() {
                $('#fn-pop').remove();
            });
        },100);
    },
    divover: function() {
        clearTimeout(Footnotes.footnotetimeout);
        $('#fn-pop').stop();
        $('#fn-pop').css({
                opacity: 0.9
        });
    }
} 
