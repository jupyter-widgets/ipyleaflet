// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const polygon = require('./Polygon.js');

export class LeafletRectangleModel extends polygon.LeafletPolygonModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletRectangleView',
      _model_name: 'LeafletRectangleModel',
      bounds: []
    };
  }
}

export class LeafletRectangleView extends polygon.LeafletPolygonView {
  create_obj() {
    this.obj = L.rectangle(this.model.get('bounds'), this.get_options());
  }
}
