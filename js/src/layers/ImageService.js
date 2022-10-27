// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const layer = require('./Layer.js');
const proj = require('../projections.js');

export class LeafletImageServiceModel extends layer.LeafletLayerModel {
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
      updateInterval: 200
    };
  }
}

export class LeafletImageServiceView extends layer.LeafletLayerView {
  create_obj() {
    this.obj = L.imageService({
      url: this.model.get('url'),
      ...this.get_options(),
      crs: proj.getProjection(this.model.get('crs')),
    });
  }

  model_events() {
    super.model_events();
    this.model.on('change:url', () => {
      this.obj._update();
    });
    for (var option in this.get_options()) {
      this.model.on('change:' + option, () => {
        this.obj._update();
      });
    }
  }
}
