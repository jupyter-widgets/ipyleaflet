// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const vectorlayer = require('./VectorLayer.js');
const { antPath } = require('leaflet-ant-path');

export class LeafletAntPathModel extends vectorlayer.LeafletVectorLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletAntPathView',
      _model_name: 'LeafletAntPathModel',
      use: 'polyline',
      delay: 400,
      weight: 5,
      dash_array: [10, 20],
      color: '#0000FF',
      pulse_color: '#FFFFFF',
      paused: false,
      reverse: false,
      hardware_accelerated: false,
      radius: 10
    };
  }
}

export class LeafletAntPathView extends vectorlayer.LeafletVectorLayerView {
  create_obj() {
    this.obj = antPath(this.model.get('locations'), this.get_ant_options());
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:locations',
      function() {
        this.obj.setLatLngs(this.model.get('locations'));
      },
      this
    );
    this.model.on_some_change(this.model.get('options'), () => {
      this.obj.setStyle(this.get_ant_options());
    });
    this.obj.setStyle(this.get_ant_options());
  }

  get_ant_options() {
    const options = this.get_options();
    if (options.use != 'circle') {
      delete options.radius;
    }
    options.use = L[options.use];
    return options;
  }
}
