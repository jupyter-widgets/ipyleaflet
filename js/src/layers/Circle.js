









var LeafletCircleModel = LeafletCircleMarkerModel.extend({
    defaults: _.extend({}, LeafletCircleMarkerModel.prototype.defaults, {
        _view_name : 'LeafletCircleView',
        _model_name : 'LeafletCircleModel'
    })
});
