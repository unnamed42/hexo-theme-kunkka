$(function() {
    var comments = $(".dq-recent-comments");
    $.get({
        url: "https://disqus.com/api/3.0/forums/listPosts.jsonp",
        data: $.param({api_key: CONFIG.disqus.api_key, forum: CONFIG.disqus.forum,
                       limit: comments.attr("data-num-items"), related: "thread"}),
        dataType: "jsonp",
        contentType: "text/javascript; charset=utf-8",
    }).then(function(data) {
        return $.map(data.response, function(comment) {
            var msg = comment.message.length > 20 ? comment.message.substring(0, 18) + "..." : comment.message;
            return {
                comment: msg.replace(/<\/?p>/g, ""),
                link: comment.thread.link,
                title: comment.thread.title,
                profileUrl: comment.author.profileUrl,
                name: comment.author.name,
                createdAt: comment.createdAt
            };
        });
    }).then(function(data) {
        var template = $("#dq-recent-comments-template").html().split(/\{\{([^\}]+)\}\}/g);
        comments.append(data.map(function(item) {
            return template.map(function(tok, i) {
                return (i % 2) ? item[tok] : tok;
            }).join('');
        }));
    });
});
