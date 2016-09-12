'use strict';

hexo.extend.filter.register('after_generate',function(){
    var duoshuo = hexo.theme.config.duoshuo_shortname,
        buttons = hexo.theme.config.buttons,
        disqus = hexo.theme.config.disqus_shortname,
        d_api = hexo.theme.config.disqus_api_key;
    
    if(!duoshuo || duoshuo.length == 0){
        hexo.route.remove('js/duoshuo.min.js');
    }
    
    if(!buttons.base || !buttons.dropdown){
        hexo.route.remove('js/buttons.min.js');
    }
    
    if(!disqus || !d_api) {
        hexo.route.remove('js/disqus.js');
    }
}); 

hexo.extend.filter.register('after_post_render',function(data){
    
    if(data.content.indexOf("#fn") != -1){
        data.content += "<script src=\"/js/footnote.min.js\" type=\"text/javascript\"></script>";
    }
    
    return data;
});
 
