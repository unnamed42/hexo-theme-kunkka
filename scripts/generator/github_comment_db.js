"use strict";

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
