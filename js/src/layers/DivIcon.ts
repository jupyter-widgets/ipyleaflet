// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import * as L from '../leaflet';
import * as layer from './Layer';

export class LeafletDivIconModel extends layer.LeafletUILayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletDivIconView',
      _model_name: 'LeafletDivIconModel',
      html: '',
      bg_pos: [0, 0],
      icon_size: null,
      icon_anchor: null,
      popup_anchor: [0, 0],
    };
  }
}

export class LeafletDivIconView extends layer.LeafletUILayerView {
  create_obj() {
    //@ts-ignore
    this.obj = L.divIcon(this.get_options());
  }
}
