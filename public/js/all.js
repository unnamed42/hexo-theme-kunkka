/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

;(function(){window.bowser=function(b){function c(a){return(a=b.match(a))&&1<a.length&&a[1]||""}function l(a){return(a=b.match(a))&&1<a.length&&a[2]||""}var f=c(/(ipod|iphone|ipad)/i).toLowerCase(),g=!/like android/i.test(b)&&/android/i.test(b),a=/CrOS/.test(b),d=c(/edge\/(\d+(\.\d+)?)/i),e=c(/version\/(\d+(\.\d+)?)/i),h=/tablet/i.test(b),k=!h&&/[^-]mobi/i.test(b);/opera|opr/i.test(b)?a={name:"Opera",opera:!0,version:e||c(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)}:/yabrowser/i.test(b)?a={name:"Yandex Browser",
    yandexbrowser:!0,version:e||c(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:/windows phone/i.test(b)?(a={name:"Windows Phone",windowsphone:!0},d?(a.msedge=!0,a.version=d):(a.msie=!0,a.version=c(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(b)?a={name:"Internet Explorer",msie:!0,version:c(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:a?a={name:"Chrome",chromeBook:!0,chrome:!0,version:c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/chrome.+? edge/i.test(b)?a={name:"Microsoft Edge",msedge:!0,version:d}:/chrome|crios|crmo/i.test(b)?
    a={name:"Chrome",chrome:!0,version:c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:f?(a={name:"iphone"==f?"iPhone":"ipad"==f?"iPad":"iPod"},e&&(a.version=e)):/sailfish/i.test(b)?a={name:"Sailfish",sailfish:!0,version:c(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(b)?a={name:"SeaMonkey",seamonkey:!0,version:c(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(b)?(a={name:"Firefox",firefox:!0,version:c(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(b)&&
(a.firefoxos=!0)):/silk/i.test(b)?a={name:"Amazon Silk",silk:!0,version:c(/silk\/(\d+(\.\d+)?)/i)}:g?a={name:"Android",version:e}:/phantom/i.test(b)?a={name:"PhantomJS",phantom:!0,version:c(/phantomjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(b)||/rim\stablet/i.test(b)?a={name:"BlackBerry",blackberry:!0,version:e||c(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:/(web|hpw)os/i.test(b)?(a={name:"WebOS",webos:!0,version:e||c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(b)&&(a.touchpad=!0)):a=/bada/i.test(b)?
{name:"Bada",bada:!0,version:c(/dolfin\/(\d+(\.\d+)?)/i)}:/tizen/i.test(b)?{name:"Tizen",tizen:!0,version:c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||e}:/safari/i.test(b)?{name:"Safari",safari:!0,version:e}:{name:c(/^(.*)\/(.*) /),version:l(/^(.*)\/(.*) /)};!a.msedge&&/(apple)?webkit/i.test(b)?(a.name=a.name||"Webkit",a.webkit=!0,!a.version&&e&&(a.version=e)):!a.opera&&/gecko\//i.test(b)&&(a.name=a.name||"Gecko",a.gecko=!0,a.version=a.version||c(/gecko\/(\d+(\.\d+)?)/i));a.msedge||!g&&!a.silk?f&&(a[f]=
    !0,a.ios=!0):a.android=!0;d="";a.windowsphone?d=c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):f?(d=c(/os (\d+([_\s]\d+)*) like mac os x/i),d=d.replace(/[_\s]/g,".")):g?d=c(/android[ \/-](\d+(\.\d+)*)/i):a.webos?d=c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):a.blackberry?d=c(/rim\stablet\sos\s(\d+(\.\d+)*)/i):a.bada?d=c(/bada\/(\d+(\.\d+)*)/i):a.tizen&&(d=c(/tizen[\/\s](\d+(\.\d+)*)/i));d&&(a.osversion=d);d=d.split(".")[0];if(h||"ipad"==f||g&&(3==d||4==d&&!k)||a.silk)a.tablet=!0;else if(k||"iphone"==f||"ipod"==
    f||g||a.blackberry||a.webos||a.bada)a.mobile=!0;a.msedge||a.msie&&10<=a.version||a.yandexbrowser&&15<=a.version||a.chrome&&20<=a.version||a.firefox&&20<=a.version||a.safari&&6<=a.version||a.opera&&10<=a.version||a.ios&&a.osversion&&6<=a.osversion.split(".")[0]||a.blackberry&&10.1<=a.version?a.a=!0:a.msie&&10>a.version||a.chrome&&20>a.version||a.firefox&&20>a.version||a.safari&&6>a.version||a.opera&&10>a.version||a.ios&&a.osversion&&6>a.osversion.split(".")[0]?a.c=!0:a.x=!0;return a}("undefined"!==
typeof window.navigator?window.navigator.userAgent:"")})();

jQuery(document).ready(function ($) {
    $('img.lazy,img.avatar').lazyload();

    if( bowser.mobile ){
        $('.mobile-menu-button').on('touchstart', function (event) {
            $('body').hasClass('mobile-menu-open') ? $('body').removeClass('mobile-menu-open') : $('body').addClass('mobile-menu-open');
        });
    }else{
        var hstatus = false,
            htimer;

        $('.dropdown').mouseenter(function (event) {
            var $this = $(this);

            if (htimer) {
                clearTimeout(htimer);
                htimer = null;
            }

            if (!$this.hasClass('selected')) {
                $this.addClass('selected');
                hstatus = true;
            }
        });

        $('.dropdown').mouseleave(function (event) {
            var $this = $(this);

            if ($this.hasClass('selected') && hstatus) {
                htimer = setTimeout(function () {
                    $this.removeClass('selected');
                    hstatus = false;
                    clearTimeout(htimer);
                    htimer = null;
                }, 100);
            }
        });
    }

});