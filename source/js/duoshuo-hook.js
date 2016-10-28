(function($){
    typeof DUOSHUO !== 'undefined'
           ? hookTemplate()
           : ($("#duoshuo-script")[0].onload = hookTemplate);
    
    var is_duoshuo_hooked = false;
    
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
            
            if (user_id && (user_id == duoshuo_admin_id)) 
                admin = '<span class="ua admin"><i class="fa fa-user-plus"></i>博主</span>';
            
            if(agent) 
                rs = rs.replace(/<\/div><p>/, admin + ua(agent) + os(agent) + '</div><p>');
            
            return rs;
        };
        
        templates.commentList = function (e) {
            //cmtlist(e); // run once first, one unknown function in origin function
            var list = e.list;
            var html = "";
            
            if(list) {
                for(var a,i=-1,r=list.length-1;r>i;) {
                    a = list[i+=1];
                    html += "<li>";
                    html += '<p><a href="'+ a.thread.url + '#comments" class="tooltipped tooltipped-n" aria-label="于 '+ a.thread.title +' 中的评论">';
                    html += (a.message.length>18 ? a.message.substring(0,18) + "..." : a.message)+"</a></p>";
                    html += '<p class="comment-meta">'+ templates.userAnchor(a.theAuthor)+ " " + templates.timeText(a.created_at) + "</p>";
                    html += "</li>";
                }
            }
            
            return html;
        }
    }
    
    function ua(e) {
        var UA = [],
            result = "";
        if (UA = e.match(/MSIE\s([^\s|;]+)/gi)) 
            result = '<span class="ua ie"><i class="fa fa-internet-explorer"></i>InterneUA Explorer|' + UA[0];
        else if (UA = e.match(/FireFox\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua firefox"><i class="fa fa-firefox"></i>Mozilla FireFox|' + version[1];
        } else if (UA = e.match(/Maxthon([\d]*)\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua maxthon">Maxthon';
        } else if (UA = e.match(/UBrowser([\d]*)\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua ucweb">UCBrowser|' + version[1];
        } else if (UA = e.match(/MetaSr/gi)) 
            result = '<span class="ua sogou">搜狗浏览器';
        else if (UA = e.match(/2345Explorer/gi)) 
            result = '<span class="ua explorer2345">2345王牌浏览器';
        else if (UA = e.match(/2345chrome/gi)) 
            result = '<span class="ua chrome2345">2345加速浏览器';
        else if (UA = e.match(/LBBROWSER/gi)) 
            result = '<span class="ua lbbrowser">猎豹安全浏览器';
        else if (UA = e.match(/MicroMessenger\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua qq"><i class="fa fa-weixin"></i>微信|' + version[1];
        } else if (UA = e.match(/QQBrowser\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua qq">QQ浏览器|' + version[1];
        } else if (UA = e.match(/QQ\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua qq"><i class="fa fa-qq"></i>QQ|' + version[1];
        } else if (UA = e.match(/MiuiBrowser\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua mi">Miui浏览器|' + version[1];
        } else if (UA = e.match(/Chrome([\d]*)\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua chrome"><i class="fa fa-chrome"></i>Chrome|' + version[1];
        } else if (UA = e.match(/safari\/([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua safari"><i class="fa fa-safari"></i>Apple Safari|' + version[1];
        } else if (UA = e.match(/Operversion[\s|\/]([^\s]+)/gi)) {
            var version = UA[0].split("/");
            result = '<span class="ua opera"><i class="fa fa-opera"></i>Opera|' + UA[1];
        } else if(UA = e.match(/Trident\/7.0/gi))
            result = '<span class="ua ie"><i class="fa fa-internet-explorer"></i>InterneUA Explorer 11';
        else 
            result = '<span class="ua other">其它浏览器';
        return result + "</span> ";
    }
    
    function os(e) {
        var result = "";
        if(e.match(/win/gi)) {
            if(e.match(/nt 5.1/gi))
                result = '<span class="os winxp"><i class="fa fa-windows"></i>Windows XP';
            else if(e.match(/nt 6.1/gi))
                result = '<span class="os win7"><i class="fa fa-windows"></i>Windows 7';
            else if(e.match(/nt 6.2/gi))
                result = '<span class="os win8"><i class="fa fa-windows"></i>Windows 8';
            else if(e.match(/nt 6.3/gi)) 
                result = '<span class="os win8_1"><i class="fa fa-windows"></i>Windows 8.1';
            else if(e.match(/nt 10.0/gi))
                result = '<span class="os win10"><i class="fa fa-windows"></i>Windows 10';
            else if(e.match(/nt 6.0/gi))
                result = '<span class="os vista"><i class="fa fa-windows"></i>Windows Vista';
            else if(e.match(/nt 5/gi))
                result = '<span class="os win2000"><i class="fa fa-windows"></i>Windows 2000'
            else 
                result = '<span class="os windows"><i class="fa fa-windows"></i>Windows'
        } else if(e.match(/android/gi))
            result = '<span class="os android"><i class="fa fa-android"></i>Android';
        else if(e.match(/ubuntu/gi))
            result = '<span class="os ubuntu"><i class="fa fa-linux"></i>Ubuntu';
        else if(e.match(/linux/gi))
            result = '<span class="os linux"><i class="fa fa-linux"></i>Linux';
        else if(e.match(/mac/gi))
            result = '<span class="os mac"><i class="fa fa-apple"></i>Mac OS X';
        else if(e.match(/unix/gi))
            result = '<span class="os unix">Unix';
        else if(e.match(/symbian/gi))
            result = '<span class="os nokia">Nokia SymbianOS';
        else 
            result = '<span class="os other">其它操作系统';
        return result + "</span>";
    } 
    
})(jQuery);
