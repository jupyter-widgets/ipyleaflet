

var LeafletCircleMarkerModel = LeafletPathModel.extend({
    defaults: _.extend({}, LeafletPathModel.prototype.defaults, {
        _view_name : 'LeafletCircleMarkerView',
        _model_name : 'LeafletCircleMarkerModel',
        location : def_loc
    })
});
