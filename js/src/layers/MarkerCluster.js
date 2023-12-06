// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('../leaflet.js');
const layer = require('./Layer.js');

export class LeafletMarkerClusterModel extends layer.LeafletLayerModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMarkerClusterView',
      _model_name: 'LeafletMarkerClusterModel',
      markers: [],
      show_coverage_on_hover: true,
      zoom_to_bounds_on_click: true,
      spiderfy_on_max_zoom: true,
      remove_outside_visible_bounds: true,
      animate: true,
      animate_adding_markers: false,
      disableClusteringAtZoom: 18,
      maxClusterRadius: 80,
      single_marker_mode: false,
      spiderfy_distance_multiplier: 1,
      polygon_options: {},
      chunked_loading: false,
      chunk_interval: 200,
      chunk_delay: 50,

      spider_leg_polyline_options: {
        weight: 1.5,
        color: '#333',
        opacity: 0.5,
      },
    };
  }
}

LeafletMarkerClusterModel.serializers = {
  ...widgets.WidgetModel.serializers,
  markers: { deserialize: widgets.unpack_models },
};

export class LeafletMarkerClusterView extends layer.LeafletLayerView {
  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:markers',
      (model) => {
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
    return this.create_child_view(child_model, {
      map_view: this.map_view,
    }).then((child_view) => {
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
