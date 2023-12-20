// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

//@ts-nocheck

import * as widgets from '@jupyter-widgets/base';
import * as L from '../leaflet';
import * as utils from '../utils';
export class LeafletControlModel extends widgets.WidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletControlView',
      _model_name: 'LeafletControlModel',
      _view_module: 'jupyter-leaflet',
      _model_module: 'jupyter-leaflet',
      options: [],
      position: 'topleft',
    };
  }
}

export class LeafletControlView extends utils.LeafletWidgetView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  render() {
    return Promise.resolve(this.create_obj()).then(() => {
      this.leaflet_events();
      this.model_events();
    });
  }

  leaflet_events() {}

  model_events() {
    var key;
    var o = this.model.get('options');
    for (var i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(
        this.model,
        'change:' + key,
        function () {
          L.setOptions(this.obj, this.get_options());
        },
        this
      );
    }
  }
}
