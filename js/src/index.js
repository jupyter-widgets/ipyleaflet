// Load css
require('leaflet/dist/leaflet.css');
require('leaflet-draw/dist/leaflet.draw.css');
require('leaflet.markercluster/dist/MarkerCluster.css');
require('leaflet.markercluster/dist/MarkerCluster.Default.css');
require('leaflet-measure/dist/leaflet-measure.css');
require('leaflet.fullscreen/Control.FullScreen.css');
require('./jupyter-leaflet.css')

// Forcibly load the marker icon images to be in the bundle.
require('leaflet/dist/images/marker-shadow.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-icon-2x.png');

// Export everything from jupyter-leaflet and the npm package version number.
module.exports = require('./jupyter-leaflet.js');
module.exports['version'] = require('../package.json').version;
