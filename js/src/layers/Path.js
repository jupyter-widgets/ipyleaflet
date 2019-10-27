var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var vectorlayer = require('./VectorLayer.js');
var LeafletVectorLayerView = vectorlayer.LeafletVectorLayerView;
var LeafletVectorLayerModel = vectorlayer.LeafletVectorLayerModel;

var LeafletPathModel = LeafletVectorLayerModel.extend({
    defaults: _.extend({}, LeafletVectorLayerModel.prototype.defaults, {
        _view_name : 'LeafletPathView',
        _model_name : 'LeafletPathModel',

        stroke : true,
        color : '#0033FF',
        weight : 5,
        fill : true,
        fill_color : '#0033FF',
        fill_opacity : 0.2,
        dash_array : null,
        line_cap : 'round',
        line_join :  'round',
        pointer_events : '',
        class_name : ''
    })
});

var LeafletPathView = LeafletVectorLayerView.extend({

    model_events: function () {
        LeafletPathView.__super__.model_events.apply(this, arguments);
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                this.obj.setStyle(this.get_options());
            }, this);
        }

        this.obj.setStyle(this.get_options());
    },

});

module.exports = {
  LeafletPathView : LeafletPathView,
  LeafletPathModel : LeafletPathModel,
};
