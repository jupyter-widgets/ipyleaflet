// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

//@ts-nocheck
import L from '../leaflet';
import * as layer from './Layer';
import * as rasterlayer from './RasterLayer';

export class LeafletHeatmapModel extends rasterlayer.LeafletRasterLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletHeatmapView',
      _model_name: 'LeafletHeatmapModel',
      locations: [],
      minOpacity: 0.05,
      maxZoom: 18,
      max: 1.0,
      radius: 25.0,
      blur: 15.0,
      gradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red',
      },
    };
  }
}

export class LeafletHeatmapView extends layer.LeafletLayerView {
  create_obj() {
    //@ts-ignore
    this.obj = L.heatLayer(this.model.get('locations'), this.get_options());
  }

  model_events() {
    super.model_events();

    this.listenTo(
      this.model,
      'change:locations',
      function () {
        this.obj.setLatLngs(this.model.get('locations'));
      },
      this
    );
  }
}
