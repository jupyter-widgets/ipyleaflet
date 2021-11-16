// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const layer = require('./Layer.js');
const utils = require('../utils');

export class LeafletMarkerClusterModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMarkerClusterView',
      _model_name: 'LeafletMarkerClusterModel',
      markers: [],	
      disableClusteringAtZoom: 18,
      maxClusterRadius: 80,
    };
  }
}

LeafletMarkerClusterModel.serializers = {
  ...widgets.WidgetModel.serializers,
  markers: { deserialize: widgets.unpack_models }
};

export class LeafletMarkerClusterView extends layer.LeafletLayerView {

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:markers',
      function(model, value) {
        this.marker_views.update(model.get('markers'));
      },
      this
    );
  }

  remove_layer_view(child_view) {
    this.obj.removeLayer(child_view.obj);
    child_view.remove();
  }

  add_layer_model(child_model) {
    return this.create_child_view(child_model, { map_view: this.map_view }).then(child_view => {
      this.obj.addLayer(child_view.obj);
      return child_view;
    });
  }

  create_obj() {
    var options = this.get_options();
    this.obj = L.markerClusterGroup(options);
    this.marker_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );
    this.marker_views.update(this.model.get('markers'));
  }
}

