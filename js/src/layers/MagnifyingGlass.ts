// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import { ViewList, WidgetModel, unpack_models } from '@jupyter-widgets/base';
import { Layer } from 'leaflet';
import L from '../leaflet';
import { LeafletLayerModel, LeafletLayerView } from './Layer';
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
  layer_views: ViewList<Layer>;

  remove_layer_view(child_view: Layer) {
    child_view.remove();
  }

  async add_layer_model(child_model: LeafletLayerModel) {
    const child_view = await this.create_child_view<LeafletLayerView>(
      child_model
    );
    return child_view.obj;
  }

  async create_obj() {
    this.layer_views = new ViewList<Layer>(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );

    const layers = this.get_options().layers;
    const layers_views = await this.layer_views.update(layers);
    const options = this.get_options();
    options.layers = layers_views;
    this.obj = L.magnifyingGlass(options);
  }

  model_events() {
    super.model_events();
    let key;
    const o = this.model.get('options');
    for (let i = 0; i < o.length; i++) {
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
