const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
    mode: 'development',
    entry: {
        common: path.resolve(__dirname, './src/assets/js/common.js'),
        index: path.resolve(__dirname, './src/assets/js/index.js'),
        main: path.resolve(__dirname, './src/assets/js/main.js')
    },
    output: {
        filename: 'assets/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {

    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/assets/css'),
                to: path.resolve(__dirname, './dist/assets/css'),
                toType: 'dir'
            },
            {
                from: path.resolve(__dirname, './src/resources'),
                to: path.resolve(__dirname, './dist/resources'),
                toType: 'dir'
            }
        ]),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/views/index.html'),
            template: path.resolve(__dirname, './src/views/index.html'),
            chunks: ['common', 'index']
        }),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/views/main.html'),
            template: path.resolve(__dirname, './src/views/main.html'),
            chunks: ['common', 'main']
        })
    ],
    watch: true,
    target: 'electron-main'
}];