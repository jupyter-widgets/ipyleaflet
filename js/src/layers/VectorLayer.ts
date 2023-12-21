// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import * as layer from './Layer';

export class LeafletVectorLayerModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVectorLayerView',
      _model_name: 'LeafletVectorLayerModel',
    };
  }
}

export class LeafletVectorLayerView extends layer.LeafletLayerView {}
