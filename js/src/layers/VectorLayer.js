


//Model

var LeafletVectorLayerModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletVectorLayerView',
        _model_name : 'LeafletVectorLayerModel'
    })
});
