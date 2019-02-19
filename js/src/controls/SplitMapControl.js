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
        var left_model = this.model.get('left_layer');
        var right_model = this.model.get('right_layer');
        var layersModel = this.map_view.model.get('layers');
        layersModel.push(left_model, right_model);
        return this.map_view.layer_views.update(layersModel).then((views) => {
            var left_view;
            var right_view;
            views.forEach((view)=>{
                if(view.model === left_model){
                    left_view = view;
                }
                if(view.model === right_model){
                    right_view = view;
                }
            });
            
            this.obj = L.control.splitMap(left_view.obj,right_view.obj);
       });
     },
});

module.exports = {
  LeafletSplitMapControlView : LeafletSplitMapControlView,
  LeafletSplitMapControlModel : LeafletSplitMapControlModel,
};
