"use strict";

hexo.extend.generator.register("kunkka", (locals) => {
    const theme = hexo.theme.config, config = hexo.config;

    let custom = [
        { path: "/404.html", data: {}, layout: ["_pages/404", "base"] },
        { path: "parts/sidebar.html", data: {}, layout: ["_sidebar/sidebar"] }
    ];

    if (theme.search || config.search)
        custom.push({ path: "/search.html", data: {}, layout: ["_pages/search", "layout"] });

    return custom;
});
