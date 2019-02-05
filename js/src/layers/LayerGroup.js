var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var layer = require('./Layer.js');
var LeafletLayerView = layer.LeafletLayerView;
var LeafletLayerModel = layer.LeafletLayerModel;

var LeafletLayerGroupModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletLayerGroupView',
        _model_name : 'LeafletLayerGroupModel',
        layers : []
    })
}, {
    serializers: _.extend({
        layers: { deserialize: widgets.unpack_models }
    }, widgets.DOMWidgetModel.serializers)
});

var LeafletLayerGroupView = LeafletLayerView.extend({
    create_obj: function () {
        this.obj = L.layerGroup();

        this.layer_views = new widgets.ViewList(
            this.add_layer_model, this.remove_layer_view, this);
        this.layer_views.update(this.model.get('layers'));
    },

    remove_layer_view: function (child_view) {
        this.obj.removeLayer(child_view.obj);
        child_view.remove();
    },

    add_layer_model: function (child_model) {
        var that = this;
        return this.create_child_view(child_model).then(function (child_view) {
            that.obj.addLayer(child_view.obj);
            return child_view;
        });
    },

    model_events: function () {
        this.listenTo(this.model, 'change:layers', function () {
            this.layer_views.update(this.model.get('layers'));
        }, this);
    },
});

module.exports = {
  LeafletLayerGroupView : LeafletLayerGroupView,
  LeafletLayerGroupModel : LeafletLayerGroupModel,
};
