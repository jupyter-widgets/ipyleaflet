// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var rasterlayer = require('./RasterLayer.js');
var LeafletRasterLayerView = rasterlayer.LeafletRasterLayerView;
var LeafletRasterLayerModel = rasterlayer.LeafletRasterLayerModel;
var Spinner = require('spin.js').Spinner;

var LeafletTileLayerModel = LeafletRasterLayerModel.extend({
    defaults: _.extend({}, LeafletRasterLayerModel.prototype.defaults, {
        _view_name : 'LeafletTileLayerView',
        _model_name : 'LeafletTileLayerModel',

        bottom : true,
        url : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        min_zoom : 0,
        max_zoom : 18,
        tile_size : 256,
        attribution : 'Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        detect_retina : false,
        tms: false,
        show_loading: false,
        loading: false,
    }),
    
    update_loading: function(value) {
        console.log(value);
        this.set('loading', value);
    }
});

var LeafletTileLayerView = LeafletRasterLayerView.extend({

    create_obj: function () {
        this.obj = L.tileLayer(
            this.model.get('url'),
            this.get_options()
        );
        this.model.on('msg:custom', _.bind(this.handle_message, this));
    },

    leaflet_events: function () {
        LeafletTileLayerView.__super__.leaflet_events.apply(this, arguments);
        var that = this;
        this.obj.on('loading', function (e) {
            //that.model.update_loading(true);
            that.model.set('loading', true);
            that.model.save_changes();
            if (that.model.get('show_loading'))
                that.spinner = new Spinner().spin(that.map_view.el);
        });
        this.obj.on('load', function(e) {
            //that.model.update_loading(false);
            that.model.set('loading', false);
            that.model.save_changes();
            that.send({
                event: 'load'
            });
            if (that.model.get('show_loading'))
                that.spinner.stop();
        });
    },
    model_events: function () {
        LeafletTileLayerView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:url', function () {
            this.obj.setUrl(this.model.get('url'));
        }, this);
    },

    handle_message: function(content) {
        if(content.msg == 'redraw'){
            this.obj.redraw();
        }
    },
});

module.exports = {
  LeafletTileLayerView : LeafletTileLayerView,
  LeafletTileLayerModel : LeafletTileLayerModel,
};
