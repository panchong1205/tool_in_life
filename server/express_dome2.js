const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('hello world');
});

app.post('/', (req,res) => {
    res.send('Hello POST');
});

app.get('/del_user', (req,res) => {
    res.send('删除页面');
});

app.get('/list_user', (req,res) => {
    res.send('用户列表页面');
});

app.get('/adcd', (req,res) => {
    res.send('正则匹配');
});
app.use(express.static('../react'));
const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});