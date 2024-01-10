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
    _refreshTileUrl: function (tile, url) {
        //use a image in background, so that only replace the actual tile, once image is loaded in cache!
        const img = new Image();
        img.onload = () => {
            L.Util.requestAnimFrame(() => {
                tile.el.src = url;
            });
        };
        img.src = url;
    },
    refresh: function () {
        //prevent _tileOnLoad/_tileReady re-triggering a opacity animation
        const wasAnimated = this._map._fadeAnimated;
        this._map._fadeAnimated = false;
        for (const key in this._tiles) {
            const tile = this._tiles[key];
            if (tile.current && tile.active) {
                const oldsrc = tile.el.src;
                const newsrc = this.getTileUrl(tile.coords);
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
//# sourceMappingURL=leaflet.js.map