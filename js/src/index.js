// Load css
require('leaflet/dist/leaflet.css');
require('leaflet-draw/dist/leaflet.draw.css');

// Default image folder - must run before loading jupyter-leaflet.
window.leaflet_image_folder = '/nbextensions/jupyter-leaflet/';

var loadedModules = [
    require('./jupyter-leaflet.js')
];

for (var i in loadedModules) {
    if (loadedModules.hasOwnProperty(i)) {
        var loadedModule = loadedModules[i];
        for (var target_name in loadedModule) {
            if (loadedModule.hasOwnProperty(target_name)) {
                module.exports[target_name] = loadedModule[target_name];
            }
        }
    }
}

module.exports['version'] = require('../package.json').version;

// Forcibly load the marker icon images to be in the bundle.
require('leaflet/dist/images/marker-shadow.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-icon-2x.png');
