



var LeafletPolygonModel = LeafletPolylineModel.extend({
    defaults: _.extend({}, LeafletPolylineModel.prototype.defaults, {
        _view_name : 'LeafletPolygonView',
        _model_name : 'LeafletPolygonModel'
    })
});
