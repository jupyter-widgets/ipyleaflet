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
      disableClusteringAtZoom: 18,
      maxClusterRadius: 80,
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
    this.listenTo(
      this.model,
      'change:opacity',
      function () {
        if (this.model.get('visible')) {
          document.querySelector('.test-icon').style.opacity =
            this.model.get('opacity');
        }
      },
      this
    );
    this.listenTo(
      this.model,
      'change:visible',
      function () {
        if (this.model.get('visible')) {
          document.querySelector('.test-icon').style.opacity =
            this.model.get('opacity');
        } else {
          document.querySelector('.test-icon').style.opacity = 0;
        }
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
    this.obj = L.markerClusterGroup({
      disableClusteringAtZoom: options['disableClusteringAtZoom'],
      maxClusterRadius: options['maxClusterRadius'],
      iconCreateFunction: function (cluster) {
        var childCount = cluster.getChildCount();

        var c = ' marker-cluster-';
        if (childCount < 10) {
          c += 'small';
        } else if (childCount < 100) {
          c += 'medium';
        } else {
          c += 'large';
        }

        return new L.DivIcon({
          html: '<div><span>' + childCount + '</span></div>',
          className: 'test-icon marker-cluster' + c,
          iconSize: new L.Point(40, 40),
        });
      },
    });

    this.marker_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );

    this.marker_views.update(this.model.get('markers'));
  }
}
