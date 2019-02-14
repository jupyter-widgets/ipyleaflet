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

    create_obj: function () {
       var leftChild = this.model.get('left_layer');
       var rightChild = this.model.get('right_layer');

       return this.map_view.add_layer_model(leftChild).then((left_layer) => {
            this.map_view.add_layer_model(rightChild).then((right_layer) => {
              this.obj = L.control.splitMap(left_layer.obj, right_layer.obj);
            });
        });
    },
});

module.exports = {
  LeafletSplitMapControlView : LeafletSplitMapControlView,
  LeafletSplitMapControlModel : LeafletSplitMapControlModel,
};
