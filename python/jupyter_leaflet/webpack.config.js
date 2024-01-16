var path = require('path');
var crypto = require('crypto');

// Workaround for loaders using "md4" by default, which is not supported in FIPS-compliant OpenSSL
var cryptoOrigCreateHash = crypto.createHash;
crypto.createHash = (algorithm) =>
  cryptoOrigCreateHash(algorithm == 'md4' ? 'sha256' : algorithm);

var rules = [
  { test: /\.ts$/, loader: 'ts-loader' },
  { test: /\.js$/, loader: 'source-map-loader' },
  { test: /\.css$/, use: ['style-loader', 'css-loader'] },
  { test: /\.(jpg|png|gif|svg)$/i, type: 'asset' },
];

var resolve = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  fallback: {
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    stream: require.resolve('stream-browserify'),
  },
};

// Packages that shouldn't be bundled but loaded at runtime
const externals = ['@jupyter-widgets/base'];

module.exports = [
  {
    // Notebook extension
    //
    // This bundle only contains the part of the JavaScript that is run on
    // load of the notebook. This section generally only performs
    // some configuration for requirejs, and provides the legacy
    // "load_ipython_extension" function which is required for any notebook
    // extension.
    entry: './src/extension.ts',
    output: {
      filename: 'extension.js',
      path: path.resolve(__dirname, 'nbextension'),
      libraryTarget: 'amd',
    },
    module: {
      rules: rules,
    },
    devtool: 'source-map',
    externals,
    resolve,
  },
  {
    // Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    entry: ['./src/amd-public-path.ts', './src/notebook.ts'],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'nbextension'),
      libraryTarget: 'amd',
      publicPath: '', // Set in amd-public-path.js
    },
    devtool: 'source-map',
    module: {
      rules: rules,
    },
    // 'module' is the magic requirejs dependency used to set the publicPath
    externals: [...externals, 'module'],
    resolve: resolve,
  },
  {
    // Embeddable jupyter-leaflet bundle
    //
    // This bundle is identical to the notebook bundle containing the custom
    // widget views and models. The only difference is it is placed in the
    // dist/ directory and shipped with the npm package for use from a CDN
    // like jsdelivr.
    //
    // The target bundle is always `dist/index.js`, which is the path
    // required by the custom widget embedder.
    entry: ['./src/amd-public-path.ts', './src/embed.ts'],
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'amd',
      publicPath: '', // Set in amd-public-path.js
    },
    devtool: 'source-map',
    module: {
      rules: rules,
    },
    // 'module' is the magic requirejs dependency used to set the publicPath
    externals: [...externals, 'module'],
    resolve: resolve,
  },
];
