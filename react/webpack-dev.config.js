/** created by panchong on 2018/2/11* */
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack-base.config');

module.exports = merge(baseWebpackConfig, {
    devtool: '#source-map', // cheap-source-map 生产环境不打map
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 基本目录结构（服务器根目录）
        host: 'localhost', // 服务器地址（可以使用IP也可以使用localhost，用ipconfig命令查看自己的IP）
        port: 8000, // 端口
        // compress: true, // 是否启用服务器压缩
        // openPage: '#/A',
    },
});
