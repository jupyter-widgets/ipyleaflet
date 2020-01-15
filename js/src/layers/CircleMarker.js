// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const path = require('./Path.js');

const DEFAULT_LOCATION = [0.0, 0.0];

export class LeafletCircleMarkerModel extends path.LeafletPathModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletCircleMarkerView',
      _model_name: 'LeafletCircleMarkerModel',
      location: DEFAULT_LOCATION
    };
  }
}

export class LeafletCircleMarkerView extends path.LeafletPathView {
  create_obj() {
    this.obj = L.circleMarker(this.model.get('location'), this.get_options());
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:location',
      function() {
        this.obj.setLatLng(this.model.get('location'));
      },
      this
    );
  }
}
