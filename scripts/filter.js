'use strict';

hexo.extend.filter.register('after_generate',function(){
    var theme = hexo.theme.config,
        duoshuo = theme.duoshuo_shortname,
        buttons = theme.buttons,
        disqus = theme.disqus_shortname,
        d_api = theme.disqus_api_key;
    
    if(!duoshuo) {
        hexo.route.remove('js/duoshuo.min.js');
    }
    
    if(!buttons.base || !buttons.dropdown) {
        hexo.route.remove('js/buttons.min.js');
    }
    
    if(!disqus || !d_api) {
        hexo.route.remove('js/disqus.min.js');
    }
}); 

hexo.extend.filter.register('after_post_render',function(data){
    
    if(data.content.indexOf("#fn") != -1){
        data.content += "<script src=\"/js/footnote.min.js\" type=\"text/javascript\"></script>";
    }
    
    return data;
});
 
