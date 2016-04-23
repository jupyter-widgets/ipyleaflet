require('leaflet/dist/leaflet.css');
require('leaflet-draw/dist/leaflet.draw.css');

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

module.exports["version"] = require("../package.json").version;
