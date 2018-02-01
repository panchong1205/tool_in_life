
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
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
        new webpack.DefinePlugin({
            DEV_STATE: JSON.stringify(JSON.parse(process.env.DEV || 'false'))
        }),
        new webpack.optimize.UglifyJsPlugin({ // js代码压缩
            compress: {
                warnings: false,
            },
        }),
        new ExtractTextPlugin('css/[id].[hash].css'),
        new HtmlWebpackPlugin({
            chunks: ['front'],
            filename: 'index.html',
            template: path.join(__dirname, '/index-tmpl.html'),
        }),
        new CleanWebpackPlugin(
            ['dist/js', 'dist/css' ], // 匹配删除的文件
            {
                root: __dirname,
                verbose: true,
                dry: false,
            }
        ),
        new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new ZipPlugin({
            path: path.join(__dirname, './'),
            filename: 'dist.zip',
        }),
    ],
    devtool: '#source-map',
};
