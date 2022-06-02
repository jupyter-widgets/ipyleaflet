var path = require("path");
var crypto = require("crypto");

// Workaround for loaders using "md4" by default, which is not supported in FIPS-compliant OpenSSL
var cryptoOrigCreateHash = crypto.createHash;
crypto.createHash = (algorithm) =>
  cryptoOrigCreateHash(algorithm == "md4" ? "sha256" : algorithm);

var rules = [
  { test: /\.css$/, use: ["style-loader", "css-loader"] },
  { test: /\.(jpg|png|gif|svg)$/i, type: "asset/resource" },
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
    entry: "./src/extension.js",
    output: {
      filename: "extension.js",
      path: path.resolve(__dirname, "..", "ipyleaflet", "nbextension"),
      libraryTarget: "amd",
    },
    resolve: resolve,
  },
  {
    // jupyter-leaflet bundle for the classic notebook
    entry: "./src/notebook.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "..", "ipyleaflet", "nbextension"),
      libraryTarget: "amd",
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    externals: ["@jupyter-widgets/base"],
    resolve: resolve,
  },
  {
    // jupyter-leaflet bundle for CDN
    entry: "./src/embed.js",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "amd",
    },
    devtool: "source-map",
    module: {
      rules: rules,
    },
    externals: ["@jupyter-widgets/base"],
    resolve: resolve,
  },
];
