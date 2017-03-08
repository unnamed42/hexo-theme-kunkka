$(function(){
    if($(".footnotes").length){
        var position = function(){
            var content = $(".fn-content").removeAttr("style");
            if($(window).width() < 640)
                content.css("width",$(window).width()/2);
            else
                content.css("width",340); // default value
            content.each(function(){
                var width = $(this).children(".fn-text").outerWidth();
                $(this).css({
                    "width": width,
                    "margin-left": width/-2
                });
            });
        };
        $(".footnote-ref").each(function(){
            var id = $(this).children("a").attr("href").substr(1),
                footnote = $(document.getElementById(id)),
                outer_wrapper = $("<span>",{"class":"fn-content"}),
                inner_wrapper = $("<span>",{"class":"fn-text"});
            footnote.find(".footnote-backref").remove();
            $(this).append(outer_wrapper.append(inner_wrapper.html(footnote.html())));
        });
        position();
        $(window).resize(position());
        
        $(document).click(function(t){
            var target = $(".fn-content"),
                clicked = $(t.target);
            if(target.is(clicked) || target.has(clicked).length != 0)
                t.stopPropagation();
            else {
                var parent = clicked.parents(".footnote-ref"),
                    active = $(".footnote-ref.active");
                if(!active.is(parent))
                    active.removeClass("active");
                if(parent.length != 0){
                    parent.toggleClass("active");
                }
            }
        });
    }
});
