





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
