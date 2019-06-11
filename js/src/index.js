// Load css
require('leaflet/dist/leaflet.css');
require('leaflet-draw/dist/leaflet.draw.css');
require('leaflet.markercluster/dist/MarkerCluster.css');
require('leaflet.markercluster/dist/MarkerCluster.Default.css');
require('leaflet-measure/dist/leaflet-measure.css');
require('leaflet-fullscreen/dist/leaflet.fullscreen.css');
require('./jupyter-leaflet.css');

// Forcibly load the marker icon images to be in the bundle.
require('leaflet/dist/images/marker-shadow.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-icon-2x.png');

// Export everything from jupyter-leaflet and the npm package version number.
var _oldL = window.L;
module.exports = require('./jupyter-leaflet.js');
module.exports['version'] = require('../package.json').version;

// if previous L existed and it got changed while loading this module
if (_oldL !== undefined && _oldL !== window.L) {
    console.log("Existing `L` detected, running ipyleaflet's Leaflet in no-conflict mode as `ipyL`");
    ipyL = L.noConflict();
}

