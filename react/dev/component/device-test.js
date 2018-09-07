/**created by panchong on 2018/1/10**/
var UA = {};
var ua = navigator.userAgent.toLowerCase(),s;
UA.ie = (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))? parseInt(s[2]):false;//ie
UA.firefox = (s =ua.match(/firefox\/([\d.]+)/))? parseInt(s[1]):false;//火狐
UA.chrome = (s = ua.match(/chrome\/([\d.]+)/))?parseInt(s[1]):false;//谷歌
UA.opera = (s = ua.match(/opera.([\d.]+)/))?parseInt(s[1]):false;//opera
UA.safari = (s = ua.match(/version\/([\d.]+).*safari/))?parseInt(s[1]):false;//safari
UA.android = (s=ua.match(/android/))?s:false;//android
UA.iphone = (s=ua.match(/iphone os/))?s:false;//苹果手机
UA.ipad = (s=ua.match(/ipad/))?s:false;//苹果平板
UA.ios = UA.ipad || UA.iphone;//ios系统
UA.isWin32 = /win32/i.test(window.navigator.platform);//windows32位
UA.isWeixin = (s=ua.match(/MicroMessenger/i))?!!s:false; //判断是否是在微信浏览器里面
UA.isUcweb = (s=ua.match(/ucbrowser/))?!!s:false;//uc浏览器
UA.isMqq = (s=ua.match(/mqqbrowser/))?!!s:false; //是否是手机qq浏览器
UA.isWeiBo = (s=ua.match(/__weibo__/))?!!s:false; //是否微博浏览器
window.UA=UA;

console.log(UA);