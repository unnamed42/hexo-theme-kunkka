$(function() {
    var is_duoshuo_hooked = false;
    
    function ua(uastring) {
        var UA = [],
            result = "";
        if (UA = uastring.match(/MSIE\s([^\s|;]+)/gi)) 
            result = '<span class="ua ie"><i class="fa fa-internet-explorer"></i>InterneUA Explorer|' + UA[0];
        else if (UA = uastring.match(/FireFox\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua firefox"><i class="fa fa-firefox"></i>Mozilla FireFox|' + version[1];
        } else if (UA = uastring.match(/Maxthon([\d]*)\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua maxthon">Maxthon';
        } else if (UA = uastring.match(/UBrowser([\d]*)\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua ucweb">UCBrowser|' + version[1];
        } else if (UA = uastring.match(/MetaSr/gi)) 
            result = '<span class="ua sogou">搜狗浏览器';
        else if (UA = uastring.match(/2345Explorer/gi)) 
            result = '<span class="ua explorer2345">2345王牌浏览器';
        else if (UA = uastring.match(/2345chrome/gi)) 
            result = '<span class="ua chrome2345">2345加速浏览器';
        else if (UA = uastring.match(/LBBROWSER/gi)) 
            result = '<span class="ua lbbrowser">猎豹安全浏览器';
        else if (UA = uastring.match(/MicroMessenger\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua qq"><i class="fa fa-weixin"></i>微信|' + version[1];
        } else if (UA = uastring.match(/QQBrowser\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua qq">QQ浏览器|' + version[1];
        } else if (UA = uastring.match(/QQ\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua qq"><i class="fa fa-qq"></i>QQ|' + version[1];
        } else if (UA = uastring.match(/MiuiBrowser\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua mi">Miui浏览器|' + version[1];
        } else if (UA = uastring.match(/Chrome([\d]*)\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua chrome"><i class="fa fa-chrome"></i>Chrome|' + version[1];
        } else if (UA = uastring.match(/safari\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua safari"><i class="fa fa-safari"></i>Apple Safari|' + version[1];
        } else if (UA = uastring.match(/Operversion[\s|\/]([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua opera"><i class="fa fa-opera"></i>Opera|' + UA[1];
        } else if(UA = uastring.match(/Trident\/7.0/gi))
            result = '<span class="ua ie"><i class="fa fa-internet-explorer"></i>InterneUA Explorer 11';
        else 
            result = '<span class="ua other">其它浏览器';
        return result + "</span> ";
    }
    
    function os(uastring) {
        var result = "";
        if(uastring.match(/win/gi)) {
            if(uastring.match(/nt 5.1/gi))
                result = '<span class="os winxp"><i class="fa fa-windows"></i>Windows XP';
            else if(uastring.match(/nt 6.1/gi))
                result = '<span class="os win7"><i class="fa fa-windows"></i>Windows 7';
            else if(uastring.match(/nt 6.2/gi))
                result = '<span class="os win8"><i class="fa fa-windows"></i>Windows 8';
            else if(uastring.match(/nt 6.3/gi)) 
                result = '<span class="os win8_1"><i class="fa fa-windows"></i>Windows 8.1';
            else if(uastring.match(/nt 10.0/gi))
                result = '<span class="os win10"><i class="fa fa-windows"></i>Windows 10';
            else if(uastring.match(/nt 6.0/gi))
                result = '<span class="os vista"><i class="fa fa-windows"></i>Windows Vista';
            else if(uastring.match(/nt 5/gi))
                result = '<span class="os win2000"><i class="fa fa-windows"></i>Windows 2000'
            else 
                result = '<span class="os windows"><i class="fa fa-windows"></i>Windows'
        } else if(uastring.match(/android/gi))
            result = '<span class="os android"><i class="fa fa-android"></i>Android';
        else if(uastring.match(/ubuntu/gi))
            result = '<span class="os ubuntu"><i class="fa fa-linux"></i>Ubuntu';
        else if(uastring.match(/linux/gi))
            result = '<span class="os linux"><i class="fa fa-linux"></i>Linux';
        else if(uastring.match(/mac/gi))
            result = '<span class="os mac"><i class="fa fa-apple"></i>Mac OS X';
        else if(uastring.match(/unix/gi))
            result = '<span class="os unix">Unix';
        else if(uastring.match(/symbian/gi))
            result = '<span class="os nokia">Nokia SymbianOS';
        else 
            result = '<span class="os other">其它操作系统';
        return result + "</span>";
    } 
    
    function hookTemplate() {
        if(is_duoshuo_hooked)
            return;
        is_duoshuo_hooked = true;
        
        var templates = DUOSHUO.templates;
        
        var post = templates.post;
        
        templates.post = function (e, t) {
            var rs = post(e, t);
            var agent = e.post.agent;
            var user_id = e.post.author.user_id;
            var admin = '';
            
            if (user_id === duoshuo_admin_id) 
                admin = '<span class="ua admin"><i class="fa fa-user-plus"></i>博主</span>';
            
            if(agent) 
                rs = rs.replace(/<\/div><p>/, admin + ua(agent) + os(agent) + '</div><p>');
            
            return rs;
        };
        
        templates.commentList = function (e) {
            var list = e.list,
                html = "";
            for(var i=0; i<list.length; ++i) {
                var post = list[i];
                html += "<li>";
                html += '<p><a href="'+ post.thread.url + '#comments" class="tooltipped tooltipped-n" aria-label="于 '+ post.thread.title +' 中的评论">';
                html += (post.message.length>18 ? post.message.substring(0,18) + "..." : post.message)+"</a></p>";
                html += '<p class="comment-meta">'+ templates.userAnchor(post.theAuthor)+ " " + templates.timeText(post.created_at) + "</p>";
                html += "</li>";
            }
            return html;
        }
    }
    
    typeof DUOSHUO !== 'undefined'
           ? hookTemplate()
           : ($("#duoshuo-script")[0].onload = hookTemplate);
    
});
