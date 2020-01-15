// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const circlemarker = require('./CircleMarker.js');

export class LeafletCircleModel extends circlemarker.LeafletCircleMarkerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletCircleView',
      _model_name: 'LeafletCircleModel'
    };
  }
}

export class LeafletCircleView extends circlemarker.LeafletCircleMarkerView {
  create_obj() {
    this.obj = L.circle(this.model.get('location'), this.get_options());
  }

  model_events() {
    super.model_events();
    // Workaround for https://github.com/Leaflet/Leaflet/pull/6128
    this.listenTo(
      this.model,
      'change:radius',
      function() {
        this.obj.setRadius(this.get_options().radius);
      },
      this
    );
  }
}
