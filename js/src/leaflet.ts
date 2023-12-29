import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-draw';
import 'leaflet-fullscreen';
import 'leaflet-measure';
import 'leaflet-rotatedmarker';
import 'leaflet-search';
import 'leaflet-splitmap';
import 'leaflet-transform';
import 'leaflet-velocity';
import 'leaflet.awesome-markers';
import 'leaflet.markercluster';
import 'leaflet.vectorgrid';
import 'proj4';
import 'proj4leaflet';
import 'protomaps-leaflet';
import './leaflet-heat';
import './leaflet-imageservice';
import './leaflet-magnifyingglass';

L.Layer.include({
  _refreshTileUrl: function (tile: any, url: any) {
    //use a image in background, so that only replace the actual tile, once image is loaded in cache!
    var img = new Image();
    img.onload = function () {
      L.Util.requestAnimFrame(function () {
        tile.el.src = url;
      });
    };
    img.src = url;
  },

  refresh: function () {
    //prevent _tileOnLoad/_tileReady re-triggering a opacity animation
    var wasAnimated = this._map._fadeAnimated;
    this._map._fadeAnimated = false;

    for (var key in this._tiles) {
      var tile = this._tiles[key];
      if (tile.current && tile.active) {
        var oldsrc = tile.el.src;
        var newsrc = this.getTileUrl(tile.coords);
        if (oldsrc != newsrc) {
          //L.DomEvent.off(tile, 'load', this._tileOnLoad); ... this doesnt work!
          this._refreshTileUrl(tile, newsrc);
        }
      }
    }

    if (wasAnimated) {
      setTimeout(() => {
        this._map._fadeAnimated = wasAnimated;
      }, 5000);
    }
  },
});

export default L;
