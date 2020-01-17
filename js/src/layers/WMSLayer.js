// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const tilelayer = require('./TileLayer.js');

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
      uppercase: false
    };
  }
}

export class LeafletWMSLayerView extends tilelayer.LeafletTileLayerView {
  create_obj() {
    this.obj = L.tileLayer.wms(this.model.get('url'), {
      ...this.get_options(),
      crs: L.CRS[this.model.get('crs')]
    });
  }
}
