// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const rasterlayer = require('./RasterLayer.js');
const layer = require('./Layer.js');

export class LeafletMagnifyingGlassModel extends rasterlayer.LeafletRasterLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMagnifyingGlassView',
      _model_name: 'LeafletMagnifyingGlassModel',
      layers: []
    };
  }
}

LeafletMagnifyingGlassModel.serializers = {
  ...widgets.WidgetModel.serializers,
  layers: { deserialize: widgets.unpack_models }
};

export class LeafletMagnifyingGlassView extends layer.LeafletLayerView {
  add_layer_model(child_model) {
    return this.create_child_view(child_model).then(child_view => {
      this.layers.push(child_view.obj);
      return child_view;
    });
  }

  create_obj() {
    this.layers = [];
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );
    this.layer_views.update(this.model.get('layers'));
    this.obj = L.magnifyingGlass({layers: this.layers});
  }

  model_events() {
    super.model_events();
  }
}
