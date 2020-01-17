// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var L = require('../leaflet.js');
var polyline = require('./Polyline.js');

export class LeafletPolygonModel extends polyline.LeafletPolylineModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletPolygonView',
      _model_name: 'LeafletPolygonModel'
    };
  }
}

export class LeafletPolygonView extends polyline.LeafletPolylineView {
  create_obj() {
    this.obj = L.polygon(this.model.get('locations'), this.get_options());
  }
}
