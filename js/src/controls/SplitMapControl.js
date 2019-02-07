var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletSplitMapControlModel = LeafletControlModel.extend({
  default: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletSplitMapControlView',
        _model_name: 'LeafletSplitMapControlModel',

        left_layer: undefined,
        right_layer: undefined
    })
}, {
    serializers: _.extend({
        left_layer: {deserialize: widgets.unpack_models},
        right_layer: {deserialize: widgets.unpack_models}
    })
});

var LeafletSplitMapControlView = LeafletControlView.extend({
  initialize: function (parameters) {
        LeafletSplitMapControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    render: function () {
        var left_layer = this.model.get('left_layer');
        var right_layer = this.model.get('right_layer');
        this.create_obj();
    },

    create_obj: function () {
        var leftChild = this.model.get('left_layer').attributes;
        var rightChild = this.model.get('right_layer').attributes;
        var left_layer = L.tileLayer(leftChild.url, leftChild.options).addTo(this.map_view.obj);
        var right_layer = L.tileLayer(rightChild.url, rightChild.options).addTo(this.map_view.obj);
        this.obj = L.control.splitMap(left_layer, right_layer);
    }
});

module.exports = {
  LeafletSplitMapControlView : LeafletSplitMapControlView,
  LeafletSplitMapControlModel : LeafletSplitMapControlModel,
};
