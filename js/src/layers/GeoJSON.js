





var LeafletGeoJSONModel = LeafletFeatureGroupModel.extend({
    defaults: _.extend({}, LeafletFeatureGroupModel.prototype.defaults, {
        _view_name : 'LeafletGeoJSONView',
        _model_name : 'LeafletGeoJSONModel',
        data : {},
        style : {},
        hover_style : {},
    })
});
