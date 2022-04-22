// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const rasterlayer = require('./RasterLayer.js');
const Spinner = require('spin.js').Spinner;

export class LeafletTileLayerModel extends rasterlayer.LeafletRasterLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletTileLayerView',
      _model_name: 'LeafletTileLayerModel',
      bottom: true,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      min_zoom: 0,
      max_zoom: 18,
      min_native_zoom: null,
      max_native_zoom: null,
      bounds: null,
      tile_size: 256,
      attribution: null,
      detect_retina: false,
      no_wrap: false,
      tms: false,
      show_loading: false,
      loading: false
    };
  }
}

export class LeafletTileLayerView extends rasterlayer.LeafletRasterLayerView {
  create_obj() {
    this.obj = L.tileLayer(this.model.get('url'), this.get_options());
    this.model.on('msg:custom', this.handle_message.bind(this));
  }

  leaflet_events() {
    super.leaflet_events();
    this.obj.on('loading', event => {
      this.model.set('loading', true);
      this.model.save_changes();
      if (this.model.get('show_loading')) {
        this.spinner = new Spinner().spin(this.map_view.el);
      }
    });
    this.obj.on('load', event => {
      this.model.set('loading', false);
      this.model.save_changes();
      this.send({
        event: 'load'
      });
      if (this.model.get('show_loading')) {
        this.spinner.stop();
      }
    });
    this.obj.on("remove", event => {
      if (this.model.get('show_loading')) {
        this.spinner.stop();
      }
    })
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:url',
      function () {
        this.obj.setUrl(this.model.get('url'), true);
        this.obj.refresh();
      },
      this
    );
  }

  handle_message(content) {
    if (content.msg == 'redraw') {
      this.obj.redraw();
    }
  }
}
