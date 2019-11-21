var L = require('leaflet');
require('leaflet-splitmap');
require('leaflet-draw');
require('leaflet.markercluster');
require('leaflet-velocity');
require('leaflet-measure');
require('./leaflet-heat.js');
require('leaflet-rotatedmarker');
require('leaflet-fullscreen');
require('leaflet-transform');

// https://github.com/Leaflet/Leaflet/issues/4968
// Marker file names are hard-coded in the leaflet source causing
// issues with webpack.
// This workaround allows webpack to inline all marker URLs.

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

module.exports = L;
