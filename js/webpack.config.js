var version = require('./package.json').version;

var loaders = [
    { test: /\.json$/, loader: "json-loader" },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.(jpg|png|gif)$/, loader: "file" },
];

module.exports = [
    {// Notebook extension
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: '../ipyleaflet/static',
            libraryTarget: 'amd'
        }
    },
    {// jupyter-leaflet bundle for the notebook
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: '../ipyleaflet/static',
            libraryTarget: 'amd',
            publicPath: '/nbextensions/jupyter-leaflet/'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    },
    {// embeddable jupyter-leaflet bundle
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: './dist/',
            libraryTarget: 'amd',
            publicPath: 'https://npmcdn.com/jupyter-leaflet@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    }
];
