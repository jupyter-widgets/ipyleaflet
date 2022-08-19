// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const layer = require('./Layer.js');
const utils = require('../utils');

export class LeafletGeoportalModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletGeoportalView',
      _model_name: 'LeafletGeoportalModel',
      name : "ORTHOIMAGERY.ORTHOPHOTOS"
    };
  }
}

export class LeafletGeoportalView extends layer.LeafletTileLayerView {
  create_obj() {
    var options = this.get_options();
    options.data = this.model.get('data');
    this.obj = L.geoportalLayer.WMTS(this.model.get('name'))

  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:data',
      function() {
        const data = this.model.get('data');
        this.obj.setData(data);
      },
      this
    );
    // Separate display_options from the options to perform a shallow copy.
    var key = 'display_options';
    this.listenTo(
      this.model,
      'change:' + key,
      function() {
        var options = {};
        options[utils.camel_case(key)] = { ...this.model.get(key) };
        L.setOptions(this.obj, options);
      },
      this
    );
  }
}
