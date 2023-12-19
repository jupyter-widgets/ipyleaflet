// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.ts');
const layergroup = require('./LayerGroup.ts');

export class LeafletFeatureGroupModel extends layergroup.LeafletLayerGroupModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletFeatureGroupView',
      _model_name: 'LeafletFeatureGroupModel',
    };
  }
}

export class LeafletFeatureGroupView extends layergroup.LeafletLayerGroupView {
  create_obj() {
    this.obj = L.featureGroup();
  }
}
