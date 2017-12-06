"use strict";

hexo.extend.filter.register("before_post_render", function(data) {
    if(data.content.indexOf("$") != -1) {
        data.mathjax = true;
    }
    return data;
});
