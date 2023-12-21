// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import L from '../leaflet';
import * as layergroup from './LayerGroup';

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
    //@ts-ignore
    this.obj = L.featureGroup();
  }
}
