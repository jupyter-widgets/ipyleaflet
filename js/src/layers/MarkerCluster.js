// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');
var LeafletLayerView = layer.LeafletLayerView;
var LeafletLayerModel = layer.LeafletLayerModel;

var LeafletMarkerClusterModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletMarkerClusterView',
        _model_name : 'LeafletMarkerClusterModel',
        markers : []
    })
}, {
    serializers: _.extend({
        markers: { deserialize: widgets.unpack_models }
    }, widgets.WidgetModel.serializers)
});

var LeafletMarkerClusterView = layer.LeafletLayerView.extend({

    render: function() {
        LeafletMarkerClusterView.__super__.render.apply(this, arguments);
        this.update_markers(this.model.get('markers'), []);
    },

    update_markers: function(newMarkers, oldMarkers) {
        // Shortcut the case of appending markers
        var that = this;
        var appendOnly = ((oldMarkers.length <= newMarkers.length)
            && (oldMarkers === newMarkers.slice(0, oldMarkers.length)));
        var markers;
        if (appendOnly) {
            markers = newMarkers.slice(oldMarkers.length);
        } else {
            this.obj.clearLayers();
            markers = newMarkers;
        }
        var markerViews = markers.map(function (m) {
            return that.create_child_view(m, {map_view: that.map_view});
        })
        return Promise.all(markerViews).then(function(mViews) {
            var leafletMarkers = mViews.map(function (mv) {
                return mv.obj;
            });
            that.obj.addLayers(leafletMarkers);
        });
    },

    model_events: function() {
        LeafletMarkerClusterView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:markers', function (model, value) {
            this.update_markers(model.get('markers'), model.previous('markers'));
        }, this);
    },

    create_obj: function () {
        this.obj = L.markerClusterGroup();
    },
});

module.exports = {
  LeafletMarkerClusterView : LeafletMarkerClusterView,
  LeafletMarkerClusterModel : LeafletMarkerClusterModel,
};
