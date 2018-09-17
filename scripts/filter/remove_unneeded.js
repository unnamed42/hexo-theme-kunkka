"use strict";

hexo.extend.filter.register("after_generate", () => {
    const route = hexo.route, theme = hexo.theme.config;

    const buttons = theme.buttons, githubComment = theme.github_comment,
          disqus = theme.disqus_shortname, disqusAPI = theme.disqus_api_key;

    if (!disqus || !disqusAPI)
        route.remove("js/disqus.js");

    if (!githubComment || !githubComment.repo)
        route.remove("js/github-comment.js");

    if (!buttons.base || !buttons.dropdown)
        route.remove("js/buttons.js");
});
