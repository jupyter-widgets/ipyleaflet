


var LeafletVideoOverlayModel = LeafletRasterLayerModel.extend({
    defaults: _.extend({}, LeafletRasterLayerModel.prototype.defaults, {
        _view_name : 'LeafletVideoOverlayView',
        _model_name : 'LeafletVideoOverlayModel',

        url : '',
        bounds : [def_loc, def_loc],
        attribution : ''
    })
});
