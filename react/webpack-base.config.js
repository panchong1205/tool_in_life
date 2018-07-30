/**created by panchong on 2018/5/16**/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        plugins: [
                            'transform-runtime',
                            ['import', {libraryName: 'antd', style: 'css'}],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']}),
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']}),
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash].[ext]',
                    outputPath: 'images/',
                },
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'font/',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV_STATE: process.env.DEV,
            LOCAL: true,
        }),
        new ExtractTextPlugin({
            filename: 'css/[id].[hash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/index-tmpl.html'),
        }),
    ],
};
