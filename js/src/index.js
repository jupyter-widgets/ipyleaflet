// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// Export everything from jupyter-leaflet and the npm package version number.
var _oldL = window.L;
module.exports = require('./jupyter-leaflet.js');
module.exports['version'] = require('../package.json').version;

// if previous L existed and it got changed while loading this module
if (_oldL !== undefined && _oldL !== window.L) {
  console.log("Existing `L` detected, running ipyleaflet's Leaflet in no-conflict mode as `ipyL`");
  ipyL = L.noConflict();
}
