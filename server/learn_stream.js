/**created by panchong on 2017/12/2**/
const fs = require('fs');
//读取数据流
const readStream = fs.createReadStream('writeSync.txt', 'utf-8');
readStream.on('data', chunk => {
    console.log('data', chunk);
});
readStream.on('end', () => {
    console.log('end');
});
readStream.on('error', err => {
    console.log('err ' + err);
});

//写入数据流
const writeStream1 = fs.createWriteStream('writeStream1.txt', 'utf-8');
writeStream1.write('使用Stream写入文本数据...\n第二行\n!!!!');
writeStream1.write('END.');
writeStream1.end();

const writeStream2 = fs.createWriteStream('writeStream2.txt', 'utf-8');
writeStream2.write(new Buffer('temple.png', 'utf-8'));
writeStream2.write(new Buffer('END.', 'utf-8'));
writeStream2.end();

// pipe
const rs = fs.createReadStream('writeStream1.txt');
const ws = fs.createWriteStream('writeStream2.txt');

rs.pipe(ws);