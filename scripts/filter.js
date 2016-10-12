'use strict';

hexo.extend.filter.register('after_generate',function(){
    var theme = hexo.theme.config,
        duoshuo = theme.duoshuo_shortname,
        buttons = theme.buttons,
        disqus = theme.disqus_shortname,
        d_api = theme.disqus_api_key;
    
    if(!duoshuo) {
        hexo.route.remove('js/duoshuo.js');
    }
    
    if(!buttons.base || !buttons.dropdown) {
        hexo.route.remove('js/buttons.js');
    }
    
    if(!disqus || !d_api) {
        hexo.route.remove('js/disqus.js');
    }
}); 

hexo.extend.filter.register('after_render:html',function(str,data){
    
    var html = "<script src=\"/js/footnote.js\" type=\"text/javascript\" async></script>";
    
    if(str.indexOf("footnote-ref") != -1)
        str = str.replace(/<\s*\/\s*head\s*>/, html + "</head>");
    
    return str;
});
