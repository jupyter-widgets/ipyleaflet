// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { DivIcon, DivIconOptions } from 'leaflet';
import L from '../leaflet';
import { LeafletUILayerModel, LeafletUILayerView } from './Layer';

export class LeafletDivIconModel extends LeafletUILayerModel {
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

export class LeafletDivIconView extends LeafletUILayerView {
  obj: DivIcon;

  create_obj() {
    this.obj = L.divIcon(this.get_options() as DivIconOptions);
  }
}
