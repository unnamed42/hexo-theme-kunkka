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
            container.html('');
            query.forEach(function(data) {
                var isMatch = true;
                var data_title = data.title.trim().toLowerCase();
                var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                var index_title = -1;
                var index_content = -1;
                var first_occur = -1;
                // only match articles with non-empty titles and contents
                if(data_title != '' && data_content != '') {
                    keywords.forEach(function(keyword, i) {
                        index_title = data_title.indexOf(keyword);
                        index_content = data_content.indexOf(keyword);
                        if( index_title < 0 && index_content < 0 ){
                            isMatch = false;
                        } else {
                            if (index_content < 0) {
                                index_content = 0;
                            }
                            if (i == 0) {
                                first_occur = index_content;
                            }
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
                        if(start < 0){
                            start = 0;
                        } else if(start == 0){
                            end = 100;
                        }
                        if(end > content.length){
                            end = content.length;
                        }
                        var match_content = content.substring(start, end); 
                        // highlight all keywords
                        keywords.forEach(function(keyword){
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
        
    })
}
