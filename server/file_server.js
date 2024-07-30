/**created by panchong on 2017/12/2**/
const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

// 解析当前目录:
// const workDir = path.resolve('.'); // '/Users/michael'
// console.log(workDir);
// 组合完整的文件路径:当前目录+'pub'+'index.html':
// const filePath = path.join(workDir, 'pub', 'index.html');
// '/Users/michael/pub/index.html'

// 从命令行参数获取root目录，默认是当前目录:
const root = path.resolve(process.argv[2] || '.');

console.log('Static root dir: ' + root);
// 创建服务器:
const server = http.createServer((request, response) => {
    if (path.normalize(decodeURI(request.url)) !== decodeURI(request.url)) {
        response.statusCode = 403;
        response.end();
        return;
    }
    // 获得URL的path，类似 '/css/bootstrap.css':
    console.log('url', request.url);
    const pathname = url.parse(request.url).pathname;
    console.log('pathname', pathname);
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    const filepath = path.join(root, pathname);
    console.log('filepath', filepath);
    // 获取文件状态:
    fs.stat(filepath, (err, stats) => {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            // console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            // console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);