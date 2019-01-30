var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('leaflet');


var rasterlayer = require('./RasterLayer.js');
var LeafletRasterLayerView = rasterlayer.LeafletRasterLayerView;
var LeafletRasterLayerModel = rasterlayer.LeafletRasterLayerModel;

//Model

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
        detect_retina : false
    })
});

// View

var LeafletTileLayerView = LeafletRasterLayerView.extend({

    create_obj: function () {
        this.obj = L.tileLayer(
            this.model.get('url'),
            this.get_options()
        );
        var that = this;
        this.obj.on('load', function() {
            that.send({
                event: 'load'
            });
        });
    },

    model_events: function () {
        LeafletTileLayerView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:url', function () {
            this.obj.setUrl(this.model.get('url'));
        }, this);
    },
});


module.exports = {
  //views
  LeafletTileLayerView : LeafletTileLayerView,

  //models
  LeafletTileLayerModel : LeafletTileLayerModel,
};
