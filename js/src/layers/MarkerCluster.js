


var LeafletMarkerClusterModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletMarkerClusterView',
        _model_name : 'LeafletMarkerClusterModel',
        markers : []
    })
}, {
    serializers: _.extend({
        markers: { deserialize: widgets.unpack_models }
    }, widgets.DOMWidgetModel.serializers)
});
