/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var s=t.fn.jquery.split(" ")[0].split(".");if(s[0]<2&&s[1]<9||1==s[0]&&9==s[1]&&s[2]<1||s[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(t){"use strict";function s(e,i){this.$body=t(document.body),this.$scrollElement=t(t(e).is(document.body)?window:e),this.options=t.extend({},s.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function e(e){return this.each(function(){var i=t(this),o=i.data("bs.scrollspy"),r="object"==typeof e&&e;o||i.data("bs.scrollspy",o=new s(this,r)),"string"==typeof e&&o[e]()})}s.VERSION="3.3.7",s.DEFAULTS={offset:10},s.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},s.prototype.refresh=function(){var s=this,e="offset",i=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(e="position",i=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var s=t(this),o=s.data("target")||s.attr("href"),r=/^#./.test(o)&&t(o);return r&&r.length&&r.is(":visible")&&[[r[e]().top+i,o]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){s.offsets.push(this[0]),s.targets.push(this[1])})},s.prototype.process=function(){var t,s=this.$scrollElement.scrollTop()+this.options.offset,e=this.getScrollHeight(),i=this.options.offset+e-this.$scrollElement.height(),o=this.offsets,r=this.targets,l=this.activeTarget;if(this.scrollHeight!=e&&this.refresh(),s>=i)return l!=(t=r[r.length-1])&&this.activate(t);if(l&&s<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)l!=r[t]&&s>=o[t]&&(void 0===o[t+1]||s<o[t+1])&&this.activate(r[t])},s.prototype.activate=function(s){this.activeTarget=s,this.clear();var e=this.selector+'[data-target="'+s+'"],'+this.selector+'[href="'+s+'"]',i=t(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},s.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var i=t.fn.scrollspy;t.fn.scrollspy=e,t.fn.scrollspy.Constructor=s,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var s=t(this);e.call(s,s.data())})})}(jQuery);

"use strict";

function stripper(content){
    var wrapper = $("<div>"+ content +"</div>"); // .html() can oly get its first child, so wrap in a div
    wrapper.find("script,style").remove(); // remove style/script in post content
    $(".gutter",wrapper).remove(); // remove code line number
    return wrapper.html();
}

/* https://stackoverflow.com/a/901144 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function searchFunc(path, search_str, content_id) {
    $.ajax({
        url: path,
        dataType: "xml",
        success: function(response) {
            var query = $("entry", response).map(function() {
                return {
                    title: $("title", this).text(),
                    content: stripper($("content", this).text()),
                    url: $("url", this).text()
                }
            }).get(),
                container = $('#' + content_id);
            if(search_str.trim().length == 0) 
                return;

            var html = '<div class="search-result-list">',
                keywords = search_str.trim().toLowerCase().split(/[\s\-]+/);
            query.forEach(function(data) {
                var isMatch = true;
                var data_title = data.title.trim().toLowerCase();
                var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                var index_title = -1;
                var index_content = -1;
                var first_occur = -1;
                // only match articles with non-empty titles and contents
                if(data_title && data_content) {
                    keywords.forEach(function(keyword, i) {
                        index_title = data_title.indexOf(keyword);
                        index_content = data_content.indexOf(keyword);
                        if( index_title < 0 && index_content < 0 )
                            isMatch = false;
                        else {
                            if (index_content < 0) 
                                index_content = 0;
                            if (!i) 
                                first_occur = index_content;
                        }
                    });
                }
                // show search results
                if (isMatch) {
                    html += '<div class="post">';
                    html += '<div class="post-header"><h2 class="post-title"><a href="' + data.url + '" class="search-result-title">' + data.title + "</a></h2></div>";
                    var content = data.content.trim().replace(/<[^>]+>/g,"");
                    if (first_occur >= 0) {
                        // cut out 100 characters
                        var start = first_occur - 20;
                        var end = first_occur + 80;
                        if(start < 0)
                            start = 0;
                        else if(!start)
                            end = 100;
                        if(end > content.length)
                            end = content.length;
                        var match_content = content.substring(start, end); 
                        // highlight all keywords
                        keywords.forEach(function(keyword) {
                            match_content = match_content.replace(new RegExp(keyword, "gi"), '<span class="search-keyword">' + keyword + '</span>');
                        });
                        html += '<div class="post-body">' + (0 == start ? "" : "...") + match_content + (end == content.length ? "" : "...") + '</div>';
                    }
                    html += "</div>"; // div.post
                    $("#no-match").addClass("matched");
                }
            });
            html += "</div>"; // div.search-result-list
            container.html(html);
        }
    });
}

// common widgets
$(function() {
    // sidebar part
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
            });
        }
    });
    
    // dropdown navigation menu
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
    
    // totop widget
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
            scroll_top = $(window).scrollTop(),
            per = parseInt(scroll_top / doc_height * 100);
        if (scroll_top >= 200) {
            totop.addClass("display");
            ctx.clearRect(0, 0, width, height);
            draw_circle('#efefef', 1);
            draw_circle('#555555', per/100);
        } else
            totop.removeClass("display");
        percent.attr("data-percent", per);
    });
});

// toc 
$(function(){
    var toc = $("#toc"), post = $(".post-body"), pos_max;
    function update_max() {
        var post_height = post.position().top + post.outerHeight(),
            toc_height = toc.height();
        pos_max = post_height - toc_height;
    };
    update_max();
    toc.children().addClass("nav"); // required for scrollspy
    $("body").scrollspy({target:"#toc", offset:40});
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop();
        toc.css("top", scroll_top<55 ? 90-scroll_top: (pos_max>scroll_top ? 35: pos_max-scroll_top));
    });
    // update pos_max on window resizing
    $(window).resize(update_max);
});

// footnotes
$(function(){
    if(!$(".footnotes").length) 
        return;
    
    function position() {
        var content = $(".fn-content").removeAttr("style");
        if($(window).width() < 640)
            content.css("width",$(window).width()/2);
        else
            content.css("width",340); // default value
        content.each(function() {
            var width = $(this).children(".fn-text").outerWidth();
            $(this).css({
                "width": width,
                "margin-left": width/-2
            });
        });
    };
    $(".footnote-ref").each(function() {
        var footnote = $($(this).children("a").attr("href")),
            outer_wrapper = $("<span>", {"class" :"fn-content"}),
            inner_wrapper = $("<span>", {"class" :"fn-text"});
        footnote.find(".footnote-backref").remove();
        $(this).append(outer_wrapper.append(inner_wrapper.html(footnote.html())));
    });
    position();
    $(window).resize(position);
    
    var target = $(".fn-content");
    $(document).click(function(t) {
        var clicked = $(t.target);
        if(target.is(clicked) || target.has(clicked).length)
            t.stopPropagation();
        else {
            var parent = clicked.parents(".footnote-ref"),
                active = $(".footnote-ref.active");
            if(!active.is(parent))
                active.removeClass("active");
            if(parent.length)
                parent.toggleClass("active");
        }
    });
});

// archive navigator
 $(function() {
    if($(window).width() <= 768)
        return;
    
    var top = $("#content").offset().top,
        nav = $("#archive-nav");
        
    if(!nav.length)
        return;
    
    var page_height = $("#primary").position().top + $("#primary").outerHeight(),
        nav_max = page_height - nav.height();
    var year_active = $(".year:first"),
        month_active = year_active.find(".month:first"),
        headers = $(".archive-title");
    year_active.addClass("active"); month_active.addClass("active");
    $(window).scroll(function() {
        var scroll_top = $(window).scrollTop();
        if(scroll_top < 55) // 55 == header.height(55px)
            nav.css({top: 115 - scroll_top});
        else if(nav_max > scroll_top)
            nav.css({top: 60}); // 60 == archive-nav.top(115px) - header.height(55px)
        else
            nav.css({top: nav_max - scroll_top});
        headers.each(function() {
            var t = $(this),
                offset = t.offset().top - 40,
                bottom = offset + t.height();
            if(offset <= scroll_top && scroll_top < bottom) {
                var id = t.attr("id"),
                    year = id.replace(/archive-(\d+)-\d+/, "$1"),
                    active_year = year_active.attr("id").substr(7); // remove "anchor-" from id
                if(year !== active_year) {
                    year_active.removeClass("active");
                    year_active = $("#anchor-" + year);
                    year_active.addClass("active");
                }
                month_active.removeClass("active");
                month_active = $("#" + id.replace("archive", "anchor"));
                month_active.addClass("active");
                return false; // terminate loop
            }
        });
    });
});
