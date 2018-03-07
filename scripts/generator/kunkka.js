"use strict";

hexo.extend.generator.register('kunkka', function(locals) {
    var theme = hexo.theme.config,
        customed = [
            {path: '/404.html', data: {}, layout: ['_pages/404', 'base']},
            {path: 'parts/sidebar.html', data: {}, layout: ['_sidebar/sidebar']}
        ];

    if(theme.search || hexo.config.search) {
        customed.push({
            path: '/search.html',
            data: {},
            layout: ['_pages/search', 'layout']
        });
    }

    return customed;
});
