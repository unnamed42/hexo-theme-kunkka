"use strict";

var PassThrough = require("stream").PassThrough;

hexo.extend.generator.register("github_comment_db", (locals) => {
    const githubComment = hexo.theme.config.github_comment;
    if (!githubComment || !githubComment.repo)
        return {};

    let json = [];
    let addItem = (item) => {
        if (item.hasOwnProperty("issue"))
            json.push(`"${item.issue}":{"path":"${item.permalink}","title":"${item.title}"}`);
    };

    locals.posts.forEach(addItem);
    locals.pages.forEach(addItem);

    return {
        path: "/github_comment_db.json",
        data: () => {
            let ss = new PassThrough();
            ss.write(`{${json.join(",")}}`);
            ss.end();
            return ss;
        }
    };
});
