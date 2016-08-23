function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
 }

hexo.extend.tag.register('sns',function(args){
    
    var icon_name = args[0];
    
    var content = args[1];
    
    var result = '';
    
    if(args.length > 2){
        
        result = "<a href=\"" + args[2] + "\" class=\"sns fa " + icon_name + "\" target=\"_blank\">";
        
        result += escapeHtml(content) + "</a>";
        
    } else {
        
        result = "<span class=\"sns fa " + icon_name + "\">";
        
        result += escapeHtml(content) + "</span>";
        
    }
    
    return "<p>" + result + "</p>";
});
