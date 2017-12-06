"use strict";

var escapeHTML = require('hexo-util').escapeHTML;

hexo.extend.helper.register("escapeHTML", function(str) {
    return escapeHTML(str);
});
