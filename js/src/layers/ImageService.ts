// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// leaflet-imageservice does not have typescript definitions
import L from '../leaflet';
import { getProjection } from '../projections';
import { LeafletLayerModel, LeafletLayerView } from './Layer';

export class LeafletImageServiceModel extends LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletImageServiceView',
      _model_name: 'LeafletImageServiceModel',
      url: '',
      f: 'image',
      format: 'jpgpng',
      pixelType: 'UNKNOWN',
      noData: [],
      noDataInterpretation: '',
      interpolation: '',
      compressionQuality: '',
      bandIds: [],
      time: [],
      renderingRule: {},
      mosaicRule: {},
      endpoint: '',
      attribution: '',
      crs: null,
      interactive: false,
      updateInterval: 200,
    };
  }
}

export class LeafletImageServiceView extends LeafletLayerView {
  obj: any;

  create_obj() {
    //@ts-ignore
    this.obj = L.imageService({
      url: this.model.get('url'),
      ...this.get_options(),
      crs: getProjection(this.model.get('crs')),
    });
  }

  model_events() {
    super.model_events();
    this.model.on('change:url', () => {
      this.obj._update();
    });
    for (let option in this.get_options()) {
      this.model.on('change:' + option, () => {
        this.obj._update();
      });
    }
  }
}
