"use strict";

var escapeHTML = require("hexo-util").escapeHTML;

hexo.extend.tag.register("sns", (args) => {
    const [iconName, content] = args;

    let result = "";

    if (args.length > 2)
        result = `<a href="${args[2]}" class="sns fa ${iconName}" target="_blank">${escapeHTML(content)}</a>`;
    else {
        const isMailAddr = (content.indexOf("@") != -1);

        if (isMailAddr)
            result = `<a href="mailto:${content}" class="sns fa ${iconName}" target="_blank">${content}</a>`;
        else
            result = `<span class="sns fa ${iconName}">${content}</span>`;
    }

    return `<p>${result}</p>`;
});
