// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { WidgetView } from '@jupyter-widgets/base';
import { Control } from 'leaflet';
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';

export class LeafletScaleControlModel extends LeafletControlModel {
  obj: Control.Scale;

  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletScaleControlView',
      _model_name: 'LeafletScaleControlModel',
    };
  }
}

export class LeafletScaleControlView extends LeafletControlView {
  initialize(
    parameters: WidgetView.IInitializeParameters<LeafletControlModel>
  ): void {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.obj = L.control.scale(this.get_options());
  }
}
