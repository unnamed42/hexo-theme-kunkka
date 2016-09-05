'use strict';

var md = require('markdown-it')({
  // allow HTML tags
  html: true
});

hexo.extend.tag.register('footnote',function(args){
    var parsed = args.join(' ').split('|');
    
    var id = parsed[0].trim();
    
    var content = '<span>' + md.renderInline(parsed[1].trim()) + '</span>';
    
    var result = "<sup id=\"fnref:" + id + "\"><a href=\"#fn:" + id + "\" rel=\"footnote\">" + id + "</a>";
    
    result += "<span class=\"fn-content\"><span class=\"fn-text\">" + content + "</span></span>";
    
    result += "</sup>";
    
    return result;
});/*

hexo.extend.filter.register('after_post_render',function(data){
    
    if(data.content.indexOf("#fn:") != -1){
        data.content += "<script src=\"js/footnote.min.js\" type=\"text/javascript\"></script>";
    }
    
    return data;
});*/
