/**created by panchong on 2018/5/16**/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const baseWebpackConfig = require('./webpack-base.config');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                }],
            },
            {
                loader: 'image-webpack-loader', // 压缩图片文件
                options: {
                    bypassOnDebug: true,
                },
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    minimize: true,
                    outputPath: 'font/',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 压缩配置
            minify: {
                removeAttributeQuotes: true, // 去掉标签上属性的引号
            },
            hash: true,
            template: path.join(__dirname, '/index-tmpl.html'),
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        new ZipPlugin({// 将打包文件生成一个压缩文件夹
            path: path.join(__dirname, './'),
            filename: 'literacy.zip',
        }),
        new CleanWebpackPlugin(
            ['build', 'literacy.zip'], // 匹配删除的文件
            {
                root: __dirname,
                verbose: true,
                dry: false,
            },
        ),
    ],
});

