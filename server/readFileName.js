/**created by panchong on 2018/1/10**/
const fs = require('fs');
const  join = require('path').join;

// 读取指定文件夹下的图片名称
const findSync = startPath => {
    let result=[];
    let imgStr = '';
    const finder = path => {
        let files=fs.readdirSync(path);
        files.forEach((val,index) => {
            console.log(val);// 图片名
            let fPath=join(path,val);
            let str = '<div class="swiper-slide"><img class="contentImg" src="./'+ fPath + '?m=' + Math.random() +'" alt=""></div>';
            imgStr += str;  //指定写入的格式
            // let stats=fs.statSync(val);
            // if(stats.isDirectory()) {
            //     result.push(fPath);
            //     // 递归读取文件夹下文件
            //     // finder(fPath)
            // };
            // 读取文件名
            // if(stats.isFile()) result.push(val);
        });

    }
    finder(startPath);
    fs.writeFileSync('test.html', imgStr); //写入指定的文件
    return result;
}
findSync('./57/'); //指定路径
