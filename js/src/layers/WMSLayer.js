// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const tilelayer = require('./TileLayer.js');
const pr = require('../projections.js');

export class LeafletWMSLayerModel extends tilelayer.LeafletTileLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletWMSLayerView',
      _model_name: 'LeafletWMSLayerModel',
      service: 'WMS',
      request: 'GetMap',
      layers: '',
      styles: '',
      format: 'image/jpeg',
      transparent: false,
      version: '1.1.1',
      crs: null,
      noWrap: true,
      uppercase: false
    };
  }
}

export class LeafletWMSLayerView extends tilelayer.LeafletTileLayerView {
  create_obj() {
    this.obj = L.tileLayer.wms(this.model.get('url'), {
      ...this.get_options(),
      crs: pr.LeaftProj[this.model.get('crs')],
      bounds:  L.latLngBounds(L.latLng(70, 0), L.latLng(90, 180))
      // crs: L.CRS[this.model.get('crs')]
    });
  }

  model_events() {
    for (var option in this.get_options()) {
      this.model.on('change:' + option, () => {
        this.obj.setParams(this.get_options(), true);
        this.obj.refresh();
      });
    }
  }
}
