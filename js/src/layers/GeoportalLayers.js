// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const layer = require('./TileLayer.js');
const utils = require('../utils');

export class LeafletGeoportalWMTSModel extends layer.LeafletTileLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeoportalWMTSView',
      _model_name: 'LeafletGeoportalWMTSModel',
      layer : 'ORTHOIMAGERY.ORTHOPHOTOS',
      apiKey : 'essentiels',
      format : 'image/jpeg'
    };
  }
}

export class LeafletGeoportalWMTSView extends layer.LeafletTileLayerView {
  create_obj() {
    this.obj = L.geoportalLayer.WMTS({layer : this.model.get('layer'), apiKey : this.model.get('api_key')}, {format : this.model.get('format')})
  }
}

