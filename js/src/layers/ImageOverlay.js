// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js')
var rasterlayer = require('./RasterLayer.js');
var LeafletRasterLayerView = rasterlayer.LeafletRasterLayerView;
var LeafletRasterLayerModel = rasterlayer.LeafletRasterLayerModel;
var def_loc = [0.0, 0.0];

var LeafletImageOverlayModel = LeafletRasterLayerModel.extend({
    defaults: _.extend({}, LeafletRasterLayerModel.prototype.defaults, {
        _view_name : 'LeafletImageOverlayView',
        _model_name : 'LeafletImageOverlayModel',

        url : '',
        bounds : [def_loc, def_loc],
        attribution : ''
    })
});

var LeafletImageOverlayView = LeafletRasterLayerView.extend({

    create_obj: function () {
        this.obj = L.imageOverlay(
            this.model.get('url'),
            this.model.get('bounds'),
            this.get_options()
        );
    },
    model_events: function () {
        LeafletImageOverlayView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:url', function () {
            url = this.model.get('url');
            bounds = this.model.get('bounds');
            options = this.get_options();
            this.map_view.obj.removeLayer(this.obj);
            this.obj = L.imageOverlay(url, bounds, options);
            this.map_view.obj.addLayer(this.obj);
        }, this);

        this.listenTo(this.model, 'change:bounds', function () {
            url = this.model.get('url');
            bounds = this.model.get('bounds');
            options = this.get_options();
            this.map_view.obj.removeLayer(this.obj);
            this.obj = L.imageOverlay(url, bounds, options);
            this.map_view.obj.addLayer(this.obj);
        }, this);
    },
});

module.exports = {
  LeafletImageOverlayView : LeafletImageOverlayView,
  LeafletImageOverlayModel : LeafletImageOverlayModel,
};
