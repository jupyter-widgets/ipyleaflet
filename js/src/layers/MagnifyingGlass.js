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
      radius: 100,
      zoomOffset: 3,
      fixedZoom: -1,
      fixedPosition: false,
      latLng: [],
      layers: []
    };
  }
}

LeafletMagnifyingGlassModel.serializers = {
  ...widgets.WidgetModel.serializers,
  layers: { deserialize: widgets.unpack_models }
};

export class LeafletMagnifyingGlassView extends layer.LeafletLayerView {
  remove_layer_view(child_view) {
    child_view.remove();
  }

  add_layer_model(child_model) {
    return this.create_child_view(child_model).then(child_view => {
      return child_view.obj;
    });
  }

  create_obj() {
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );
    var layers = this.get_options().layers;
    return this.layer_views.update(layers).then(layers => {
      var options = this.get_options();
      options.layers = layers;
      this.obj = L.magnifyingGlass(options);
    });
  }

  model_events() {
    super.model_events();
    var key;
    var o = this.model.get('options');
    for (var i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(
        this.model,
        'change:' + key,
        function() {
          this.map_view.obj.removeLayer(this.obj);
          this.create_obj().then(() => {
            this.map_view.obj.addLayer(this.obj);
          });
        },
        this
      );
    }
  }
}
