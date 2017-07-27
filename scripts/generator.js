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

var PassThrough = require('stream').PassThrough;

hexo.extend.generator.register('github_comment_db', function(locals) {
    var github_comment = hexo.theme.config.github_comment;
    if(!github_comment || !github_comment.repo) 
        return {};
    
    var json = [];
    function addItem(item) {
        if(item.hasOwnProperty('issue')) {
            var res = '"' + item.issue + '":{';
            res += '"path":"' + item.permalink + '",';
            res += '"title":"' + item.title + '"}';
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
