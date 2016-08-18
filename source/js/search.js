function stripper(string) {
    var html = $("<div>" + string + "</div>");
    html.find("script,style").remove();
    $(".gutter",html).remove();
    return html.html();
}

var searchFunc = function(path, search_string, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            // get the contents from search data
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: stripper($("content", this).text()),
                    url: $( "url" , this).text()
                };
            }).get();
            
            var $resultContent = document.getElementById(content_id);
            
            if (search_string.trim().length <= 0) {
                return;
            }
            var str='<div class=\"search-result-list\">';
            var keywords = search_string.trim().toLowerCase().split(/[\s\-]+/);
            $resultContent.innerHTML = "";
            // perform local searching
            datas.forEach(function(data) {
                var isMatch = true;
                var content_index = [];
                var data_title = data.title.trim().toLowerCase();
                var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                var data_url = data.url;
                var index_title = -1;
                var index_content = -1;
                var first_occur = -1;
                // only match artiles with not empty titles and contents
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
                    str += "<div class=\"post\"><div class=\"post-header\"><h2 class=\"post-title\"><a href='"+ data_url +"' class='search-result-title'>"+ data.title +"</a></h2></div>";
                    var content = data.content.trim().replace(/<[^>]+>/g,"");
                    if (first_occur >= 0) {
                        // cut out 100 characters
                        var start = first_occur - 20;
                        var end = first_occur + 80;
                        if(start < 0){
                            start = 0;
                        }
                        if(start == 0){
                            end = 100;
                        }
                        if(end > content.length){
                            end = content.length;
                        }
                        var match_content = content.substring(start, end); 
                        // highlight all keywords
                        keywords.forEach(function(keyword){
                            var regS = new RegExp(keyword, "gi");
                            match_content = match_content.replace(regS, "<span class=\"search-keyword\">"+keyword+"</span>");
                        });
                        
                        str += "<div class=\"search-result post-body\">" + (start==0?"":"...") + match_content + (end==content.length?"":"...") + "</div>"
                    }
                    str += "</div>";
                }
            });
            str += "</div>";
            $resultContent.innerHTML = str;
        }
    });
}
