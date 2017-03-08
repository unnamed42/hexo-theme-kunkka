"use strict";

hexo.extend.generator.register('kunkka_customed', function(locals) {
    var customed = [{path: '/404.html', data: {}, layout: ['404', 'base']}],
        config = hexo.theme.config;
    
    if(config.sidebar) {
        customed.push({
            path: 'components/recent-posts.html', 
            data: {}, 
            layout: ['_widget/recent_posts']
        });
        if(config.links) {
            customed.push({
                path: 'components/links.html',
                data: {},
                layout: ['_widget/links']
            });
        }
    }
    if(config.search) {
        customed.push({
            path: '/search.html', 
            data: {}, 
            layout: ['search', 'layout']
        });
    }
    
    return customed;
}); 

var PassThrough = require('stream').PassThrough;

hexo.extend.generator.register('github_comment_db', function(locals) {
    if(!hexo.theme.config.github_comment.repo) 
        return {};
    
    var json = [];
    function addItem(item) {
        if(item.hasOwnProperty('issue')) {
            var res = '';
            res += '"' + item.issue + '":{';
            res += '"path":"' + item.permalink + '",';
            res += '"title":"' + item.title + '"';
            res += '}';
            json.push(res);
        }
    }
    locals.posts.forEach(addItem);
    locals.pages.forEach(addItem);
    return {
        path: '/github_comment_db.json',
        data: function() {
            var ss = new PassThrough();
            ss.write('{' + json.join(',') + '}');
            ss.end();
            return ss;
        }
    }
});
