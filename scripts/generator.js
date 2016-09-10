"use strict";

hexo.extend.generator.register('kunkka_customed',function(local){
    return [
        {path: '/404.html', data: {}, layout: ['404','base']},
        {path: '/search.html', data: {}, layout: ['search','layout']},
        {path: 'components/recent-posts.html', data: {}, layout: ['_widget/recent_posts']},
        {path: 'components/links.html', data: {}, layout: ['_widget/links']}
    ];
}); 
