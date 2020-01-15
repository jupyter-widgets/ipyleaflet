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
      markers: []
    };
  }
}

LeafletMarkerClusterModel.serializers = {
  ...widgets.WidgetModel.serializers,
  markers: { deserialize: widgets.unpack_models }
};

export class LeafletMarkerClusterView extends layer.LeafletLayerView {
  render() {
    super.render();
    this.update_markers(this.model.get('markers'), []);
  }

  update_markers(newMarkers, oldMarkers) {
    // Shortcut the case of appending markers
    var appendOnly =
      oldMarkers.length <= newMarkers.length &&
      oldMarkers === newMarkers.slice(0, oldMarkers.length);
    var markers;
    if (appendOnly) {
      markers = newMarkers.slice(oldMarkers.length);
    } else {
      this.obj.clearLayers();
      markers = newMarkers;
    }
    var markerViews = markers.map(m => {
      return this.create_child_view(m, { map_view: this.map_view });
    });
    return Promise.all(markerViews).then(mViews => {
      var leafletMarkers = mViews.map(function(mv) {
        return mv.obj;
      });
      this.obj.addLayers(leafletMarkers);
    });
  }

  model_events() {
    super.model_events();
    this.listenTo(
      this.model,
      'change:markers',
      function(model, value) {
        this.update_markers(model.get('markers'), model.previous('markers'));
      },
      this
    );
  }

  create_obj() {
    this.obj = L.markerClusterGroup();
  }
}
