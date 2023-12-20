// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

//@ts-nocheck
import * as L from '../leaflet';
import * as control from './Control';
export class LeafletScaleControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletScaleControlView',
      _model_name: 'LeafletScaleControlModel',
    };
  }
}

export class LeafletScaleControlView extends control.LeafletControlView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    //@ts-ignore
    this.obj = L.control.scale(this.get_options());
  }
}
