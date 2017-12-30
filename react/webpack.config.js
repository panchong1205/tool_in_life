/**
 * Created by panchong on 16/12/28.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        front: './main.js',
    },
    output: { path: `${__dirname}/dist`, filename: 'js/[name].[hash].js', publicPath: '/' },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: [{ loader: 'babel-loader' }],
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'less-loader'] }),
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
        }, {
            test: /\.(jpg|png|gif)$/,
            use: ['file-loader?name=images/[name].[ext]'],
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)$/,
            use: ['file-loader?name=fonts/[name].[ext]'],
        }],

    },
    plugins: [
        new ExtractTextPlugin('css/[id].[hash].css'),
        new HtmlWebpackPlugin({
            chunks: ['front'],
            filename: 'index.html',
            template: path.join(__dirname, '/index-tmpl.html'),
        }),
        new CleanWebpackPlugin(
            ['dist/js', 'dist/css' ], // 匹配删除的文件
            {
                root: __dirname,  // 根目录
                verbose: true,   // 开启在控制台输出信息
                dry: false,   // 启用删除文件
            }
        ),
    ],
    devtool: '#source-map',
};
