$(document).ready(function(){
    var list = $(".dq-recent-comments");
    var dq_recent = {
        "api_key": list.attr("data-api-key"),
        "forum": list.attr("data-forum"),
        "limit": list.attr("data-num-items")
    };
    $.ajax({
        type: 'GET',
        url: "https://disqus.com/api/3.0/forums/listPosts.jsonp?limit=" + dq_recent['limit'] + "&forum="+ dq_recent['forum'] +"&related=thread&api_key=" + dq_recent['api_key'],
        dataType: "jsonp",
        contentType: "text/javascript; charset=utf-8",
        jsonpCallback: "disqusJSONP",
        cache: true
    });
});

function disqusJSONP(result){
    var html = '';
    $.each(result.response,function(item){
        var message = item.message.length > 20? item.message.substring(0,18) + "...": item.message;
        message = message.replace(/<\/?p>/g,'');
        html += "<li>" ;
        html += "<p><a href=\"" + item.thread.link +"/#comments\" aria-label=\"于" + item.thread.title +"中的评论\" class=\"tooltipped tooltipped-n\">" + message + "</p>";
        html += "<p class=\"comment-meta\"><a rel=\"nofollow author\" target=\"_blank\" href=\"" + item.author.profileUrl + "\">" + item.author.name + "</a>";
        html += "<span class=\"comment-time\" title=\"" + item.createdAt + "\">" + item.createdAt + "</span>";
        html += "</p></li>";
    });
    list.html(html);
}
