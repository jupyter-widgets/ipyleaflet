var path = require('path');
var version = require('./package.json').version;

var leaflet_marker_selector = /leaflet\/dist\/images\/marker-.*\.png/;

var rules = [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },

    // We exclude the default marker files, since their names are hardcoded in
    // the leaflet source.
    {
        test: /\.(jpg|png|gif|svg)$/,
        exclude: leaflet_marker_selector,
        use: ['file-loader']
    },
    {
        test: leaflet_marker_selector,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }]
    }
];

module.exports = [
    {// Notebook extension
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'ipyleaflet', 'static'),
            libraryTarget: 'amd'
        }
    },
    {// jupyter-leaflet bundle for the notebook
        entry: './src/notebook.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'ipyleaflet', 'static'),
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base']
    },
    {// embeddable jupyter-leaflet bundle
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/jupyter-leaflet@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base']
    }
];
