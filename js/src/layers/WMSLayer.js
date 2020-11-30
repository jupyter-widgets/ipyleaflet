// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const tilelayer = require('./TileLayer.js');
const proj = require('../projections.js');

export class LeafletWMSLayerModel extends tilelayer.LeafletTileLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletWMSLayerView',
      _model_name: 'LeafletWMSLayerModel',
      layers: '',
      styles: '',
      format: 'image/jpeg',
      transparent: false,
      crs: null,
      uppercase: false
    };
  }
}

export class LeafletWMSLayerView extends tilelayer.LeafletTileLayerView {
  create_obj() {
    this.obj = L.tileLayer.wms(this.model.get('url'), {
      ...this.get_options(),
      crs: proj.getProjection(this.model.get('crs')),
    });
  }

  model_events() {
    super.model_events();

    for (var option in this.get_options()) {
      this.model.on('change:' + option, () => {
        this.obj.setParams(this.get_options(), true);
        this.obj.refresh();
      });
    }
  }
}
