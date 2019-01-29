


var LeafletRectangleModel = LeafletPolygonModel.extend({
    defaults: _.extend({}, LeafletPolygonModel.prototype.defaults, {
        _view_name : 'LeafletRectangleView',
        _model_name : 'LeafletRectangleModel',
        bounds : []
    })
});
