var path = require("path");
var crypto = require("crypto");

// Workaround for loaders using "md4" by default, which is not supported in FIPS-compliant OpenSSL
var cryptoOrigCreateHash = crypto.createHash;
crypto.createHash = (algorithm) =>
  cryptoOrigCreateHash(algorithm == "md4" ? "sha256" : algorithm);

var rules = [
  { test: /\.css$/, use: ["style-loader", "css-loader"] },
  { test: /\.(jpg|png|gif|svg)$/i, type: "asset" },
];

var resolve = {
  fallback: {
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    stream: require.resolve("stream-browserify"),
  },
};

module.exports = [
  {
    // Notebook extension
    //
    // This bundle only contains the part of the JavaScript that is run on
    // load of the notebook. This section generally only performs
    // some configuration for requirejs, and provides the legacy
    // "load_ipython_extension" function which is required for any notebook
    // extension.
    entry: "./src/extension.js",
    output: {
      filename: "extension.js",
      path: path.resolve(__dirname, "..", "ipyleaflet", "nbextension"),
      libraryTarget: "amd",
    },
    resolve: resolve,
  },
  {
    // Bundle for the notebook containing the custom widget views and models
    //
    // This bundle contains the implementation for the custom widget views and
    // custom widget.
    // It must be an amd module
    entry: ["./amd-public-path.js", "./src/notebook.js"],
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "..", "ipyleaflet", "nbextension"),
      libraryTarget: "amd",
      publicPath: "", // Set in amd-public-path.js
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    // 'module' is the magic requirejs dependency used to set the publicPath
    externals: ["@jupyter-widgets/base", "module"],
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
    entry: ["./amd-public-path.js", "./src/embed.js"],
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "amd",
      publicPath: "", // Set in amd-public-path.js
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    // 'module' is the magic requirejs dependency used to set the publicPath
    externals: ["@jupyter-widgets/base", "module"],
    resolve: resolve,
  },
];
