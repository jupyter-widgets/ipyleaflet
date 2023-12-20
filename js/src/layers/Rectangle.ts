// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import * as L from '../leaflet';
import * as polygon from './Polygon';

export class LeafletRectangleModel extends polygon.LeafletPolygonModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletRectangleView',
      _model_name: 'LeafletRectangleModel',
      bounds: [],
    };
  }
}

export class LeafletRectangleView extends polygon.LeafletPolygonView {
  create_obj() {
    //@ts-ignore
    this.obj = L.rectangle(this.model.get('bounds'), this.get_options());
  }
}
