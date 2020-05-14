const L = require('leaflet');
require('leaflet-defaulticon-compatibility');
require('leaflet.vectorgrid');
require('leaflet-splitmap');
require('leaflet-draw');
require('leaflet.markercluster');
require('leaflet-velocity');
require('leaflet-measure');
require('./leaflet-heat.js');
require('leaflet-rotatedmarker');
require('leaflet-fullscreen');
require('leaflet-transform');
require('leaflet.awesome-markers');
require('leaflet-search');

// Monkey patch GridLayer for smoother URL updates
L.patchGridLayer = function(layer) {
  layer._refreshTileUrl = function(tile, url) {
    //use a image in background, so that only replace the actual tile, once image is loaded in cache!
    var img = new Image();
    img.onload = function() {
      L.Util.requestAnimFrame(function() {
        tile.el.src = url;
      });
    }
    img.src = url;
  };

  layer.refresh = function() {
    //prevent _tileOnLoad/_tileReady re-triggering a opacity animation
    var wasAnimated = this._map._fadeAnimated;
    this._map._fadeAnimated = false;

    for (var key in this._tiles) {
      tile = this._tiles[key];
      if (tile.current && tile.active) {
        var oldsrc = tile.el.src;
        var newsrc = this.getTileUrl(tile.coords);
        if (oldsrc != newsrc) {
          //L.DomEvent.off(tile, 'load', this._tileOnLoad); ... this doesnt work!
          this._refreshTileUrl(tile,newsrc);
        }
      }
    }

    if (wasAnimated) {
      setTimeout(function() { map._fadeAnimated = wasAnimated; }, 5000);
    }
  }
}

var oldTileLayer = L.tileLayer;
L.tileLayer = function(url, options) {
  var obj = oldTileLayer(url, options);
  L.patchGridLayer(obj);
  return obj;
}

L.tileLayer.wms = function(url, options) {
  var obj = oldTileLayer.wms(url, options);
  L.patchGridLayer(obj);
  return obj;
}

module.exports = L;
