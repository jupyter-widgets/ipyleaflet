// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletZoomControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletZoomControlView',
      _model_name: 'LeafletZoomControlModel',
      zoom_in_text: '+',
      zoom_in_title: 'Zoom in',
      zoom_out_text: '-',
      zoom_out_title: 'Zoom out'
    };
  }
}

export class LeafletZoomControlView extends control.LeafletControlView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.obj = L.control.zoom(this.get_options());
  }
}
