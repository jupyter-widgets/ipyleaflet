// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletSplitMapControlModel extends control.LeafletControlModel {
  default() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletSplitMapControlView',
      _model_name: 'LeafletSplitMapControlModel',
      left_layer: undefined,
      right_layer: undefined
    };
  }
}

LeafletSplitMapControlModel.serializers = {
  ...control.LeafletControlModel,
  left_layer: { deserialize: widgets.unpack_models },
  right_layer: { deserialize: widgets.unpack_models }
};

function asArray(arg) {
  return Array.isArray(arg) ? arg : [arg];
}

export class LeafletSplitMapControlView extends control.LeafletControlView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    var left_models = asArray(this.model.get('left_layer'));
    var right_models = asArray(this.model.get('right_layer'));
    var layersModel = this.map_view.model.get('layers');
    layersModel = layersModel.concat(left_models, right_models);

    return this.map_view.layer_views.update(layersModel).then(views => {
      var left_views = [];
      var right_views = [];
      views.forEach(view => {
        if (left_models.includes(view.model)) {
          left_views.push(view.obj);
        }
        if (right_models.includes(view.model)) {
          right_views.push(view.obj);
        }
      });
      this.obj = L.control.splitMap(left_views, right_views);
    });
  }
}
