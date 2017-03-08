$(function() {
    var comments = $(".dq-recent-comments"),
        config = {
            "api_key": comments.attr("data-api-key"),
            "forum": comments.attr("data-forum"),
            "limit": comments.attr("data-num-items")
        };
    if(comments.length) {
        $.ajax({
            type: "GET",
            url: "https://disqus.com/api/3.0/forums/listPosts.jsonp",
            data: $.param({"limit": config.limit, "forum": config.forum, "related": "thread", "api_key": config.api_key}),
            dataType: "jsonp",
            contentType: "text/javascript; charset=utf-8",
            cache: true
        }).done(function(data) {
            var html = "";
            $.each(data.response, function(index, comment){
                var msg = comment.message.length > 20 ? comment.message.substring(0, 18) + "..." : comment.message;
                msg = msg.replace(/<\/?p>/g, "");
                html += '<li>';
                html +=     '<p><a href="' + comment.thread.link + '/#comments" aria-label="于 ' + comment.thread.title + ' 中的评论" class="tooltipped tooltipped-n">' + msg + '</p>';
                html +=     '<p class="comment-meta"><a rel="nofollow author" target="_blank" href="' + comment.author.profileUrl + '">' + comment.author.name + "</a> ";
                html +=     '<span class="comment-time" title="' + comment.createdAt + '">' + comment.createdAt + "</span>";
                html += "</p></li>";
            });
            comments.html(html);
        });
    }
});
