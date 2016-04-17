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
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    },
    {// embeddable jupyter-threejs bundle
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: './dist/',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    }
];
