var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var tilelayer = require('./TileLayer.js');
var LeafletTileLayerView = tilelayer.LeafletTileLayerView;
var LeafletTileLayerModel = tilelayer.LeafletTileLayerModel;

var LeafletLocalTileLayerModel = LeafletTileLayerModel.extend({
    defaults: _.extend({}, LeafletTileLayerModel.prototype.defaults, {
        _view_name : 'LeafletLocalTileLayerView',
        _model_name : 'LeafletLocalTileLayerModel',

        path : ''
    })
});

var LeafletLocalTileLayerView = LeafletTileLayerView.extend({
    create_obj: function () {
        this.model.set('url', this.model.get('path'));
        this.model.save_changes();
        LeafletLocalTileLayerView.__super__.create_obj.apply(this, arguments);
    }
});

module.exports = {
  LeafletLocalTileLayerView : LeafletLocalTileLayerView,
  LeafletLocalTileLayerModel : LeafletLocalTileLayerModel,
};
