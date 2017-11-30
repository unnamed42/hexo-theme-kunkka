"use strict";

hexo.extend.helper.register("stringify", function(str) {
    str = typeof str == "String" ? str : str.toString();
    if(str.charAt(0) == '"' && str.charAt(str.length - 1) == '"')
        return str;
    else
        return '"' + str + '"';
});
