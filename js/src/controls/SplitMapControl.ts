// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// leaflet-splitmap does not have typescript definitions
import { unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletControlModel, LeafletControlView } from './Control';

export class LeafletSplitMapControlModel extends LeafletControlModel {
  default() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletSplitMapControlView',
      _model_name: 'LeafletSplitMapControlModel',
      left_layer: undefined,
      right_layer: undefined,
    };
  }
}

LeafletSplitMapControlModel.serializers = {
  ...LeafletControlModel,
  left_layer: { deserialize: unpack_models },
  right_layer: { deserialize: unpack_models },
};

function asArray(arg: any) {
  return Array.isArray(arg) ? arg : [arg];
}

export class LeafletSplitMapControlView extends LeafletControlView {
  initialize(parameters: any) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    var left_models = asArray(this.model.get('left_layer'));
    var right_models = asArray(this.model.get('right_layer'));
    var layersModel = this.map_view.model.get('layers');
    layersModel = layersModel.concat(left_models, right_models);

    return this.map_view.layer_views.update(layersModel).then((views: any) => {
      var left_views: any[] = [];
      var right_views: any[] = [];
      views.forEach((view: any) => {
        if (left_models.includes(view.model)) {
          left_views.push(view.obj);
        }
        if (right_models.includes(view.model)) {
          right_views.push(view.obj);
        }
      });
      //@ts-ignore
      this.obj = L.control.splitMap(left_views, right_views);
    });
  }
}
