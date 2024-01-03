// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// leaflet-magnifyingglass does not have typescript definitions
import { ViewList, WidgetModel, unpack_models } from '@jupyter-widgets/base';
import L from '../leaflet';
import { LeafletLayerView } from './Layer';
import { LeafletRasterLayerModel } from './RasterLayer';

export class LeafletMagnifyingGlassModel extends LeafletRasterLayerModel {
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
      layers: [],
    };
  }
}

LeafletMagnifyingGlassModel.serializers = {
  ...WidgetModel.serializers,
  layers: { deserialize: unpack_models },
};

export class LeafletMagnifyingGlassView extends LeafletLayerView {
  layer_views: any;

  remove_layer_view(child_view: any) {
    child_view.remove();
  }

  add_layer_model(child_model: any) {
    return this.create_child_view(child_model).then((child_view: any) => {
      return child_view.obj;
    });
  }

  create_obj() {
    this.layer_views = new ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );
    var layers = this.get_options().layers;
    return this.layer_views.update(layers).then((layers: any) => {
      var options = this.get_options();
      options.layers = layers;
      //@ts-ignore
      this.obj = L.magnifyingGlass(options);
    });
  }

  model_events() {
    super.model_events();
    var key;
    var o = this.model.get('options');
    for (var i = 0; i < o.length; i++) {
      key = o[i];
      this.listenTo(this.model, 'change:' + key, () => {
        this.map_view.obj.removeLayer(this.obj);
        this.create_obj().then(() => {
          this.map_view.obj.addLayer(this.obj);
        });
      });
    }
  }
}
