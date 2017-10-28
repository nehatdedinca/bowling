import path from 'path';
import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEV = process.env.NODE_ENV === 'development';

export default {
    cache: DEV,
    devtool: DEV ? 'eval' : false,
    target: 'web',

    entry: DEV
        ? ['react-hot-loader/patch',
            path.resolve(__dirname, './src/index.js')]
        : path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, './static/assets'),
        publicPath: '/assets/',
        filename: 'app.js'
    },

    // webpack dev server configs for hot module replacement
    devServer: {
        hot: true,
        inline: true,
        port: 8090,
        contentBase: path.resolve(__dirname, './static')
    },

    // defined module loaders:
    // - js loaders for linting and transpiling
    // - sass-, css-, and style-loader for building css in prod and inline styles in dev environment
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ].concat(DEV ? [{
            // style loader for HMR
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }] : [{
            // ExtractTextPlugin for building single css file in prod dev
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('css-loader?minimize=true!sass-loader')
        }])
    },

    // main tasks of the plugins:
    // prod env:
    // - clearing the static assets directory in prod env
    // - extracting one single css file
    // - uglify js code
    // dev environment
    // - enabling hot module replacement
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({__DEV__: DEV})
    ].concat(DEV ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ] : [
        new CleanPlugin(path.resolve(__dirname, './static/assets')),
        new ExtractTextPlugin('./app.css'),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: false})
    ])
};