// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const control = require('./Control.js');

export class LeafletDrawControlModel extends control.LeafletControlModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletDrawControlView',
      _model_name: 'LeafletDrawControlModel',
      polyline: { shapeOptions: {} },
      polygon: { shapeOptions: {} },
      circle: {},
      circlemarker: {},
      rectangle: {},
      marker: {},
      edit: true,
      remove: true
    };
  }
}

LeafletDrawControlModel.serializers = {
  ...control.LeafletControlModel.serializers,
  layer: { deserialize: widgets.unpack_models }
};

export class LeafletDrawControlView extends control.LeafletControlView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  create_obj() {
    this.feature_group = L.featureGroup();
    this.map_view.obj.addLayer(this.feature_group);
    var polyline = this.model.get('polyline');
    if (!Object.keys(polyline).length) {
      polyline = false;
    }
    var polygon = this.model.get('polygon');
    if (!Object.keys(polygon).length) {
      polygon = false;
    }
    var circle = this.model.get('circle');
    if (!Object.keys(circle).length) {
      circle = false;
    }
    var circlemarker = this.model.get('circlemarker');
    if (!Object.keys(circlemarker).length) {
      circlemarker = false;
    }
    var rectangle = this.model.get('rectangle');
    if (!Object.keys(rectangle).length) {
      rectangle = false;
    }
    var marker = this.model.get('marker');
    if (!Object.keys(marker).length) {
      marker = false;
    }
    this.obj = new L.Control.Draw({
      edit: {
        featureGroup: this.feature_group,
        edit: this.model.get('edit'),
        remove: this.model.get('remove')
      },
      draw: {
        polyline: polyline,
        polygon: polygon,
        circle: circle,
        circlemarker: circlemarker,
        rectangle: rectangle,
        marker: marker
      }
    });
    this.map_view.obj.on('draw:created', e => {
      var layer = e.layer;
      var geo_json = layer.toGeoJSON();
      geo_json.properties.style = layer.options;
      this.send({
        event: 'draw:created',
        geo_json: geo_json
      });
      this.feature_group.addLayer(layer);
    });
    this.map_view.obj.on('draw:edited', e => {
      var layers = e.layers;
      layers.eachLayer(layer => {
        var geo_json = layer.toGeoJSON();
        geo_json.properties.style = layer.options;
        this.send({
          event: 'draw:edited',
          geo_json: geo_json
        });
      });
    });
    this.map_view.obj.on('draw:deleted', e => {
      var layers = e.layers;
      layers.eachLayer(layer => {
        var geo_json = layer.toGeoJSON();
        geo_json.properties.style = layer.options;
        this.send({
          event: 'draw:deleted',
          geo_json: geo_json
        });
      });
    });
    this.model.on('msg:custom', this.handle_message.bind(this));
  }

  handle_message(content) {
    if (content.msg == 'clear') {
      this.feature_group.eachLayer(layer => {
        this.feature_group.removeLayer(layer);
      });
    } else if (content.msg == 'clear_polylines') {
      this.feature_group.eachLayer(layer => {
        if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
          this.feature_group.removeLayer(layer);
        }
      });
    } else if (content.msg == 'clear_polygons') {
      this.feature_group.eachLayer(layer => {
        if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
          this.feature_group.removeLayer(layer);
        }
      });
    } else if (content.msg == 'clear_circles') {
      this.feature_group.eachLayer(layer => {
        if (layer instanceof L.CircleMarker) {
          this.feature_group.removeLayer(layer);
        }
      });
    } else if (content.msg == 'clear_circle_markers') {
      this.feature_group.eachLayer(layer => {
        if (layer instanceof L.CircleMarker && !(layer instanceof L.Circle)) {
          this.feature_group.removeLayer(layer);
        }
      });
    } else if (content.msg == 'clear_rectangles') {
      this.feature_group.eachLayer(layer => {
        if (layer instanceof L.Rectangle) {
          this.feature_group.removeLayer(layer);
        }
      });
    } else if (content.msg == 'clear_markers') {
      this.feature_group.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          this.feature_group.removeLayer(layer);
        }
      });
    }
  }
}
