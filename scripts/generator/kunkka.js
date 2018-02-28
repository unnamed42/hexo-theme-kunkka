"use strict";

hexo.extend.generator.register('kunkka', function(locals) {
    var customed = [{path: '/404.html', data: {}, layout: ['_pages/404', 'base']}],
        theme = hexo.theme.config;

    if(theme.sidebar) {
        customed.push({
            path: 'parts/recent-posts.html',
            data: {},
            layout: ['_sidebar/recent-posts']
        });
        if(theme.links) {
            customed.push({
                path: 'parts/links.html',
                data: {},
                layout: ['_sidebar/links']
            });
        }
    }
    if(theme.search || hexo.config.search) {
        customed.push({
            path: '/search.html',
            data: {},
            layout: ['_pages/search', 'layout']
        });
    }

    return customed;
});
