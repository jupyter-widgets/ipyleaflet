var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('leaflet');
require('TileLayer.js');


//Model

var LeafletLocalTileLayerModel = LeafletTileLayerModel.extend({
    defaults: _.extend({}, LeafletTileLayerModel.prototype.defaults, {
        _view_name : 'LeafletLocalTileLayerView',
        _model_name : 'LeafletLocalTileLayerModel',

        path : ''
    })
});

//View

var LeafletLocalTileLayerView = LeafletTileLayerView.extend({

    create_obj: function () {
        this.model.set('url', window.location.href.replace(/[^/]*$/, '') + this.model.get('path'));
        LeafletLocalTileLayerView.__super__.create_obj.apply(this, arguments);
    }

});


module.exports = {
  //views
  LeafletLocalTileLayerView : LeafletLocalTileLayerView,

  //models
  LeafletLocalTileLayerModel : LeafletLocalTileLayerModel,
};
