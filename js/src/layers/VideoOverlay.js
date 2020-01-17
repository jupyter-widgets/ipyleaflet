// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const L = require('../leaflet.js');
const rasterlayer = require('./RasterLayer.js');

const DEFAULT_LOCATION = [0.0, 0.0];

export class LeafletVideoOverlayModel extends rasterlayer.LeafletRasterLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletVideoOverlayView',
      _model_name: 'LeafletVideoOverlayModel',
      url: '',
      bounds: [DEFAULT_LOCATION, DEFAULT_LOCATION],
      attribution: ''
    };
  }
}

export class LeafletVideoOverlayView extends rasterlayer.LeafletRasterLayerView {
  create_obj() {
    this.obj = L.videoOverlay(
      this.model.get('url'),
      this.model.get('bounds'),
      this.get_options()
    );
    this.obj.on('load', () => {
      var MyPauseControl = L.Control.extend({
        onAdd: () => {
          var button = L.DomUtil.create('button');
          button.innerHTML = '&#10074&#10074';
          L.DomEvent.on(button, 'click', () => {
            this.obj.getElement().pause();
          });
          return button;
        }
      });
      var MyPlayControl = L.Control.extend({
        onAdd: () => {
          var button = L.DomUtil.create('button');
          button.innerHTML = '&#9658';
          L.DomEvent.on(button, 'click', () => {
            this.obj.getElement().play();
          });
          return button;
        }
      });
      new MyPauseControl().addTo(this.map_view.obj);
      new MyPlayControl().addTo(this.map_view.obj);
    });
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:url',
      function() {
        const url = this.model.get('url');
        const bounds = this.model.get('bounds');
        const options = this.get_options();
        this.map_view.obj.removeLayer(this.obj);
        this.obj = L.videoOverlay(url, bounds, options);
        this.map_view.obj.addLayer(this.obj);
      },
      this
    );

    this.listenTo(
      this.model,
      'change:bounds',
      function() {
        const url = this.model.get('url');
        const bounds = this.model.get('bounds');
        const options = this.get_options();
        this.map_view.obj.removeLayer(this.obj);
        this.obj = L.videoOverlay(url, bounds, options);
        this.map_view.obj.addLayer(this.obj);
      },
      this
    );
  }
}
