/**created by panchong on 2017/12/9**/
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const cors = require('koa-cors');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// // 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
//     await next(); // 调用下一个middleware
// });
//
// app.use(async (ctx, next) => {
//     const start = new Date().getTime(); // 当前时间
//     await next(); // 调用下一个middleware
//     const ms = new Date().getTime() - start; // 耗费时间
//     console.log(`Time: ${ms}ms`); // 打印耗费时间
// });
const render = page => new Promise(( resolve, reject ) => {
    let viewUrl = `./${page}`
    fs.readFile(viewUrl, "utf-8", ( err, data ) => {
        if ( err ) {
            reject( err )
        } else {
            resolve( data )
        }
    })
});
let home = new Router();
// 子路由1
home.get('/test1', async ( ctx ) => {
    let result = {
        success: true,
        data: "{\frac {1}{2}} \div  | = \frac {1}{2}",
        msg: '',
    };
    ctx.body = result;
});
// app.use(async (ctx, next) => {
//     await next();
//     // ctx.response.type = 'text/html';
//     // let html = await render( 'test1.html' );
//     // ctx.body = html;
// });
app.use(cors());
app.use(home.routes()).use(home.allowedMethods());
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
