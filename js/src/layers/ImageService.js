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
      // image server url
      url: '',
      // response format
      f: 'image',
      // output image format
      format: 'jpgpng',
      // data type of the raster image
      pixelType: 'UNKNOWN',
      // pixel value or list of pixel values representing no data
      noData: [],
      // how to interpret no data values
      noDataInterpretation: '',
      // resampling process for interpolating the pixel values
      interpolation: '',
      // lossy quality for image compression
      compressionQuality: '',
      // order of bands to export for multiple band images
      bandIds: [],
      // time instance or extent for image
      time: [],
      // rules for rendering
      renderingRule: {},
      // rules for mosaicking
      mosaicRule: {},
      // image transparency
      transparent: false,
      // endpoint format for building the export image url
      endpoint: '',
      // image service attribution
      attribution: '',
      // coordinate reference system
      crs: null,
      // emit when clicked or hovered
      interactive: false,
      // update interval for panning
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
    };
  }
}
