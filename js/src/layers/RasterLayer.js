var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');
var LeafletLayerView = layer.LeafletLayerView;
var LeafletLayerModel = layer.LeafletLayerModel;
var def_loc = [0.0, 0.0];

var LeafletRasterLayerModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletRasterLayerView',
        _model_name : 'LeafletRasterLayerModel',
        visible : true
    })
});

var LeafletRasterLayerView = LeafletLayerView.extend({
    model_events: function () {
        LeafletRasterLayerView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:opacity', function () {
            if (this.model.get('visible')) {
                this.obj.setOpacity(this.model.get('opacity'));
            }
        }, this);
        this.listenTo(this.model, 'change:visible', function () {
            if (this.model.get('visible')) {
                this.obj.setOpacity(this.model.get('opacity'));
            } else {
                this.obj.setOpacity(0);
            }
        }, this);

        if (this.model.get('visible')) {
            this.obj.setOpacity(this.model.get('opacity'));
        } else {
            this.obj.setOpacity(0);
        }
    }
});

module.exports = {
  LeafletRasterLayerView : LeafletRasterLayerView,
  LeafletRasterLayerModel : LeafletRasterLayerModel,
};
