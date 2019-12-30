// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');
var rasterlayer = require('./RasterLayer.js');
var LeafletRasterLayerView = rasterlayer.LeafletRasterLayerView;
var LeafletRasterLayerModel = rasterlayer.LeafletRasterLayerModel;

var LeafletHeatmapModel = LeafletRasterLayerModel.extend({
    defaults: _.extend({}, LeafletRasterLayerModel.prototype.defaults, {
        _view_name : 'LeafletHeatmapView',
        _model_name : 'LeafletHeatmapModel',

        locations : [],
        minOpacity: 0.05,
        maxZoom: 18,
        max: 1.0,
        radius: 25.0,
        blur: 15.0,
        gradient: {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}
    })
});

var LeafletHeatmapView = layer.LeafletLayerView.extend({

    create_obj: function () {
        this.obj = L.heatLayer(
            this.model.get('locations'),
            this.get_options()
        );
    },

    model_events: function () {
        LeafletHeatmapView.__super__.model_events.apply(this, arguments);

        this.listenTo(this.model, 'change:locations', function () {
            this.obj.setLatLngs(this.model.get('locations'));
        }, this);
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                this.obj.setOptions(this.get_options());
            }, this);
        }
    },
});

module.exports = {
  LeafletHeatmapView : LeafletHeatmapView,
  LeafletHeatmapModel : LeafletHeatmapModel,
};
