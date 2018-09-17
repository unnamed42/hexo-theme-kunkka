"use strict";

hexo.extend.filter.register("before_post_render", (data) => {
    data.mathjax = data.content.indexOf("$") != -1;
    return data;
});
