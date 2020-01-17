// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const layer = require('./Layer.js');

export class LeafletAwesomeIconModel extends layer.LeafletUILayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletAwesomeIconView',
      _model_name: 'LeafletAwesomeIconModel',
      name: 'home',
      marker_color: 'blue',
      icon_color: 'blue',
      spin: false
    };
  }
}

export class LeafletAwesomeIconView extends layer.LeafletUILayerView {
  create_obj() {
    this.obj = L.AwesomeMarkers.icon({
      prefix: 'fa',
      icon: this.model.get('name'),
      markerColor: this.model.get('marker_color'),
      iconColor: this.model.get('icon_color'),
      spin: this.model.get('spin')
    });
  }
}
