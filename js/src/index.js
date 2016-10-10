// Setup notebook base URL
__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/jupyter-leaflet/';

// Load css
require('leaflet/dist/leaflet.css');
require('leaflet-draw/dist/leaflet.draw.css');

// Forcibly load the marker icon images to be in the bundle.
require('leaflet/dist/images/layers-2x.png');
require('leaflet/dist/images/layers.png');
require('leaflet/dist/images/marker-shadow.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-icon-2x.png');

// Export everything from jupyter-leaflet and the npm package version number.
module.exports = require('./jupyter-leaflet.js');
module.exports['version'] = require('../package.json').version;
