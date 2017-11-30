"use strict";

hexo.extend.generator.register('kunkka_customed', function(locals) {
    var customed = [{path: '/404.html', data: {}, layout: ['404', 'base']}],
        theme = hexo.theme.config;
    
    if(theme.sidebar) {
        customed.push({
            path: 'components/recent-posts.html', 
            data: {}, 
            layout: ['_widget/recent_posts']
        });
        if(theme.links) {
            customed.push({
                path: 'components/links.html',
                data: {},
                layout: ['_widget/links']
            });
        }
    }
    if(theme.search || hexo.config.search) {
        customed.push({
            path: '/search.html', 
            data: {}, 
            layout: ['search', 'layout']
        });
    }
    
    return customed;
}); 