'use strict';

hexo.extend.filter.register('after_generate',function(){
    var duoshuo = hexo.theme.config.duoshuo_shortname,
        buttons = hexo.theme.config.buttons;
    
    if(!duoshuo || duoshuo.length == 0){
        hexo.route.remove('js/duoshuo.min.js');
    }
    
    if(!buttons.base || !buttons.dropdown){
        hexo.route.remove('js/buttons.min.js');
    }
}); 

hexo.extend.filter.register('after_post_render',function(data){
    
    if(data.content.indexOf("#fn") != -1){
        data.content += "<script src=\"/js/footnote.min.js\" type=\"text/javascript\"></script>";
    }
    
    return data;
});
 
