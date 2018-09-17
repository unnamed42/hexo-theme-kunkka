"use strict";

hexo.extend.helper.register("quoted", (str) => {
    str = str.toString();
    if (str.charAt(0) == '"' && str.charAt(str.length - 1) == '"')
        return str;
    else
        return `"${str}"`;
});
