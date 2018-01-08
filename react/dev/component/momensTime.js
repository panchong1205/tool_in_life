/**created by panchong on 2018/1/7**/
const momentsTime = date => {// 计算朋友圈发表时间 只计算当天的几小时前几分钟前 非当日时间直接显示年月日
    const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
    };
    const momentsDay = {
        year: new Date(date).getFullYear(),
        month: new Date(date).getMonth() + 1,
        day: new Date(date).getDate(),
        hour: new Date(date).getHours(),
        minute: new Date(date).getMinutes(),
    };
    if (today.year !== momentsDay.year) {
        return `${momentsDay.year}年${momentsDay.month}月${momentsDay.day}日`;
    }
    if (today.month !== momentsDay.month) {
        return `${momentsDay.year}年${momentsDay.month}月${momentsDay.day}日`;
    }
    if (today.day !== momentsDay.day) {
        return `${momentsDay.year}年${momentsDay.month}月${momentsDay.day}日`;
    }
    if (today.hour !== momentsDay.hour) {
        return `${today.hour - momentsDay.hour}小时前`;
    }
    if (today.minute !== momentsDay.minute) {
        return `${today.minute - momentsDay.minute}分钟前`;
    }
    return '刚刚';
};
export default momentsTime;