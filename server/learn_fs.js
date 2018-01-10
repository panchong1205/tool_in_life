/**created by panchong on 2017/11/28**/
const fs = require('fs');
const  join = require('path').join;

//异步读取文件
fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('异步', err);
    } else {
        console.log('异步', data);
        console.log('异步', `${data.length}bytes`);
    }
});

// 同步读取文件
try {
    const data = fs.readFileSync('test.html', 'utf-8');
    console.log('同步', data);
} catch (err) {
    // 出错了
    console.log('同步', err);
}

//异步写入文件
const writedata = '这是异步步写入的';
fs.writeFile('write.txt', writedata, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

// 同步写入文件
const writedataSync = JSON.stringify({
    content: '这是同步写入的',
    type: '同步',
});
fs.writeFileSync('writeSync.txt', writedataSync);

// stat获取文件相关信息
fs.statSync('writeSync.txt', (err, stat) => {
    if (err) {
        console.log(err);
    } else {
        console.log(stat);
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
