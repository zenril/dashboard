var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app : [
            path.join(__dirname, 'project/src/js/index.js')
        ],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public/js/'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'env', 'react'
                    ]
                }
            },

            { test: /\.css$/, loader: 'style-loader!css-loader'},
            //install css-loader style-loader sass-loader node-sass --save-dev
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'}

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')

        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            path: path.resolve(__dirname, 'public/js/'),
            filename: 'vendor.bundle.js'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: true
        //     }
        // }),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: '../index.html',
            template: 'project/src/template.html',
            inject:true
        }),
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};