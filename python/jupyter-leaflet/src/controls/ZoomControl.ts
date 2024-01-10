// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { WidgetView } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';

export class LeafletZoomControlModel extends LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletZoomControlView',
      _model_name: 'LeafletZoomControlModel',
      zoom_in_text: '+',
      zoom_in_title: 'Zoom in',
      zoom_out_text: '-',
      zoom_out_title: 'Zoom out',
    };
  }
}

export class LeafletZoomControlView extends LeafletControlView {
  initialize(
    parameters: WidgetView.IInitializeParameters<LeafletControlModel>
  ) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.obj = L.control.zoom(this.get_options());
  }
}
