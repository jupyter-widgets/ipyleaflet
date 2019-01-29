

var LeafletPathModel = LeafletVectorLayerModel.extend({
    defaults: _.extend({}, LeafletVectorLayerModel.prototype.defaults, {
        _view_name : 'LeafletPathView',
        _model_name : 'LeafletPathModel',

        stroke : true,
        color : '#0033FF',
        weight : 5,
        fill : true,
        fill_color : '#0033FF',
        fill_opacity : 0.2,
        dash_array : null,
        line_cap : 'round',
        line_join :  'round',
        pointer_events : '',
        class_name : ''
    })
});
