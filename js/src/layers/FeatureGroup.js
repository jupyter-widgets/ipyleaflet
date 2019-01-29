




var LeafletFeatureGroupModel = LeafletLayerGroupModel.extend({
    defaults: _.extend({}, LeafletLayerGroupModel.prototype.defaults, {
        _view_name : 'LeafletFeatureGroupView',
        _model_name : 'LeafletFeatureGroupModel'
    })
});
