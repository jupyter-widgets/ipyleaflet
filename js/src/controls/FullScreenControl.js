// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletFullScreenControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletFullScreenControlView',
      _model_name: 'LeafletFullScreenControlModel'
    };
  }
}

export class LeafletFullScreenControlView extends control.LeafletControlView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.obj = L.control.fullscreen(this.get_options());
  }
}
