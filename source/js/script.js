"use strict";

function visible(jqueryElem) {
    return jqueryElem.length && !jqueryElem.is(":hidden");
}

/**
 * Calculate difference between two Javascript Date Object in days
 * copied from https://stackoverflow.com/a/15289883
 */
function dateDiffInDays(a, b) {
    var ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()),
        ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((ub - ua) / 86400000);
}

/**
 * Initialize on page fully loaded and update on window resize
 */
function initAndUpdate(initializers) {
    $(window).on("load", initializers)
             .resize(initializers);
}

// inspired by https://jsfiddle.net/mekwall/up4nu/
function scrollSpy(menuSelector, options) {
    var menu = $(menuSelector);
    if(!visible(menu))
        return;
    options = options || {};
    var offset = options.offset || 0;
    var activeClassName = options.activeClassName || "active";

    var scollTarget = menu.find("a").map(function() {
            var item = $($(this).attr("href"));
            if (item.length)
                return item[0]; // avoid becoming 2-dim jquery array
        }), lastId = null, active = $();

    $(window).scroll(function() {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + offset;

        // Get id of current scroll item
        var id = scollTarget.filter(function() {
            return $(this).offset().top < fromTop;
        }).last().attr("id") || "";

        if (lastId !== id) {
            active.removeClass(activeClassName);
            var newActive = [];

            for(var target = menu.find("[href='#" + id + "']");
                target.length && !target.is(menu);
                target = target.parent()) {
                if(target.is("li"))
                    newActive.push(target[0]);
            }
            active = $(newActive).addClass(activeClassName).trigger("scrollspy");
            lastId = id;
        }
    });
}

function makeSticky(stickySelector, options) {
    var sticky = $(stickySelector);
    if(!visible(sticky))
        return;
    options = options || {};
    var belowHeight = $(options.below || "#header").height(),
        within = $(options.within || "#primary"),
        originTop = sticky.position().top, posMax = 0;
    initAndUpdate(function() {
        var withinHeight = within.position().top + within.outerHeight();
        posMax = withinHeight - sticky.height();
    });
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop(), top;
        if(scrollTop < belowHeight)
            top = originTop - scrollTop;
        else if(posMax > scrollTop)
            top = originTop - belowHeight;
        else
            top = posMax - scrollTop;
        sticky.css("top", top);
    });
}

/**
 * Create HTML Elements according to template and data
 * @param {tmplSelector} selector of template string, type: string/jQuery
 * @param {dataSource} data, type: Array (or classes have map method) of plain object
 * @return array of resulting HTML elements, type: Array of String
 */
function template(tmplSelector, dataSource) {
    var tmpl = $(tmplSelector).html().split(/\{\{([^\}]+)\}\}/g);
    return dataSource.map(function(item) {
        return tmpl.map(function(tok, i) {
            return (i % 2) ? item[tok] : tok;
        }).join('');
    });
}

// sidebar loader
$(function() {
    $("#sidebar").load("/parts/sidebar.html", function() {
        var suffix = $(this).find("#recent-posts .list").attr("data-suffix");
        $(this).find(".update-time").each(function() {
            var time = new Date($(this).attr("data-date")),
                diff = dateDiffInDays(time, new Date());
            if(100 >= diff)
                $(this).html(diff.toString() + suffix);
        });

        // disqus recent comments in sidebar
        var comments = $(".dq-recent-comments");
        if(!visible(comments))
            return;
        $.get({
            url: "https://disqus.com/api/3.0/forums/listPosts.jsonp",
            data: $.param({api_key: CONFIG.disqus.api_key, forum: CONFIG.disqus.forum,
                        limit: comments.attr("data-num-items"), related: "thread"}),
            dataType: "jsonp",
            contentType: "text/javascript; charset=utf-8",
        }).then(function(data) {
            comments.append(template("#dq-recent-comments-template", $.map(data.response, function(comment) {
                var msg = comment.message.length > 20 ? comment.message.substring(0, 18) + "..." : comment.message;
                return {
                    comment: msg.replace(/<\/?p>/gi, ""),
                    link: comment.thread.link,
                    title: comment.thread.title,
                    profileUrl: comment.author.profileUrl,
                    name: comment.author.name,
                    createdAt: comment.createdAt
                };
            })));
        });
    });
});

// dropdown navigation menu
$(function() {
    var timer, active = false;
    $("#dropdown").hover(function() {
        var dropdown = $(this);
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        if(!dropdown.hasClass("active")) {
            dropdown.addClass("active");
            active = true;
        }
    }, function() {
        var dropdown = $(this);
        if(dropdown.hasClass("active") && active) {
            timer = setTimeout(function() {
                dropdown.removeClass("active");
                active = false;
                clearTimeout(timer);
                timer = null;
            }, 100);
        }
    });

    $("#global-nav").click(function() {
        // to make this still effective on window resize,
        // don't put the if-condition below out of click listener
        if ($(window).width() < 768) {
            $(this).toggleClass("collapse");
        }
    });
});

// totop widget
$(function() {
    var totop = $("#totop"),
        canvas = $("#totop-canvas"),
        percent = $("#totop-percent"),
        width = canvas.width(),
        height = canvas.height(),
        center = width / 2,
        radius = parseInt((width - 3) / 2),
        ctx = canvas[0].getContext("2d");
    function drawCircle(color, percent) {
        ctx.beginPath();
        ctx.arc(center, center, radius, - Math.PI / 2, Math.PI * 1.5 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = "round"; // butt, round or square
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    totop.click(function() {
        $("body, html").animate({
            scrollTop: 0
        }, 800);
    });

    $(window).scroll(function() {
        var docHeight = $(document).height() - $(window).height(),
            scrollTop = $(window).scrollTop(),
            per = parseInt(scrollTop / docHeight * 100);
        if (scrollTop >= 200) {
            totop.addClass("display");
            ctx.clearRect(0, 0, width, height);
            drawCircle("#efefef", 1);
            drawCircle("#555555", per/100);
        } else
            totop.removeClass("display");
        percent.attr("data-percent", per);
    });
});

// toc
$(function() {
    var tocContainer = $("#toc");
    if(!visible(tocContainer))
        return;
    var toc = tocContainer.children(), tocHeight = 0;
    initAndUpdate(function() {
        tocHeight = toc.height();
    });
    scrollSpy(tocContainer, {offset: 200});
    makeSticky(tocContainer, {within: ".post-body"});

    $(".toc-item").on("scrollspy", function() {
        var tocTop = toc.scrollTop(),
            link = $(this).children(".toc-link"),
            thisTop = link.position().top;
        // make sure the highlighted element contains no child
        if($(this).height() != link.height())
            return;
        // if the highlighted element is above current view of toc
        if(thisTop <= 0)
            toc.scrollTop(tocTop + thisTop);
        // else if below current view of toc
        else if(tocHeight <= thisTop)
            toc.scrollTop(tocTop + thisTop + link.outerHeight() - tocHeight);
    });
});

// footnotes
$(function() {
    if(!$(".footnotes").length)
        return;

    $(".footnote-ref").each(function() {
        var footnote = $($(this).children("a").attr("href")),
            outer_wrapper = $("<span>", {"class" :"fn-content"}),
            inner_wrapper = $("<span>", {"class" :"fn-text"});
        footnote.find(".footnote-backref").remove();
        $(this).append(outer_wrapper.append(inner_wrapper.html(footnote.html())));
    });

    initAndUpdate(function() {
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
    });

    var active = $(); // current visible footnote
    $("#primary").click(function(e) {
        var clicked = $(e.target),
            fn = clicked.closest(".footnote-ref");
        if(!active.is(fn)) { // if clicked on another footnote
            active.removeClass("active");
            fn.addClass("active");
            active = fn;
        } else if(clicked.is("a")) // if clicked on self
            active.toggleClass("active");
    });
});

// archive navigator
$(function() {
    var nav = $("#archive-nav");
    if(!visible(nav))
        return;
    scrollSpy(nav, {offset: 150});
    makeSticky(nav);
});
