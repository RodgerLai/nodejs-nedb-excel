const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const config = require('./config');
const appVersion = require('./package.json').version;
const languages = require('./app/i18n/languages');

const staticFolder = path.resolve(__dirname, 'assets');
const momentFilter = languages.map(lang => lang.iso).join('|');

module.exports = {
    content: __dirname,
    entry: [
        './app/index.jsx'
    ],
    output: {
        path: staticFolder,
        publicPath: '/assets/',
        filename: `app.${appVersion}.js`
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /(\.jsx|\.js)$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.svg$/, loader: 'url?limit=10' },
            { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
            { test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpeg' },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /(\.scss)$/,
                loader: ExtractTextPlugin.extract('style',
                'css?sourceMap&modules&importLoaders=1&localIdentName' +
                '=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox')
            }
        ]
    },
    toolbox: {
        theme: path.join(__dirname, 'app/theme.scss')
    },
    postcss: [autoprefixer],
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, new RegExp(momentFilter)),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            hash: false,
            template: 'content/index-prod.html',
            inject: true,
            appVersion
        }),
        new ExtractTextPlugin(`style.${appVersion}.css`, { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false,
            __USE_GA__: config.GA_Enabled,
            __GA_ID__: `'${config.GA_Tracking_ID}'`
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
