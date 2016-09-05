'use strict';

hexo.extend.filter.register('after_post_render',function(data){
    
    if(data.content.indexOf("#fn") != -1){
        data.content += "<script src=\"js/footnote.min.js\" type=\"text/javascript\"></script>";
    }
    
    return data;
});
