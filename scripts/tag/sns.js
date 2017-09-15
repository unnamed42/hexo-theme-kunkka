'use strict'; 

var escapeHTML = require('hexo-util').escapeHTML;

hexo.extend.tag.register('sns', function(args) {
    
    var icon_name = args[0],
        content = args[1];
    
    var result = "";
    
    if(args.length > 2){
        result = '<a href="' + args[2] + '" class="sns fa ' + icon_name + '" target="_blank">';
        result += escapeHTML(content) + "</a>";
    } else {
        result = '<span class="sns fa ' + icon_name + '">';
        result += escapeHTML(content) + "</span>";
    }
    
    return "<p>" + result + "</p>";
});
