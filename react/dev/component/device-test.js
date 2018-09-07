/**created by panchong on 2018/1/10**/
const ua = navigator.userAgent.toLowerCase();
const s;
let UA = {
    isIE: (s = ua.match(/(msie\s|trident.*rv:)([\d.]+)/))? parseInt(s[2]):false,//ie
    firefox: (s =ua.match(/firefox\/([\d.]+)/))? parseInt(s[1]):false,//火狐
    chrome: (s = ua.match(/chrome\/([\d.]+)/))?parseInt(s[1]):false,//谷歌
    opera: (s = ua.match(/opera.([\d.]+)/))?parseInt(s[1]):false,//opera
    safari: (s = ua.match(/version\/([\d.]+).*safari/))?parseInt(s[1]):false,//safari
    android: (s=ua.match(/android/))?s:false,//android
    iphone: (s=ua.match(/iphone os/))?s:false,//苹果手机
    ipad: (s=ua.match(/ipad/))?s:false,//苹果平板
    ios: ((s=ua.match(/iphone os/))?s:false) || ((s=ua.match(/ipad/))?s:false),//ios系统
    isWin32: /win32/i.test(window.navigator.platform),//windows32位
    isWeixin: (s=ua.match(/MicroMessenger/i))?!!s:false, //判断是否是在微信浏览器里面
    isUcweb: (s=ua.match(/ucbrowser/))?!!s:false,//uc浏览器
    isMqq: (s=ua.match(/mqqbrowser/))?!!s:false, //是否是手机qq浏览器
    isWeiBo: (s=ua.match(/__weibo__/))?!!s:false, //是否微博浏览器
};
console.log(UA);
