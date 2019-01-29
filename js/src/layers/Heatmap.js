









var LeafletHeatmapModel = LeafletRasterLayerModel.extend({
    defaults: _.extend({}, LeafletRasterLayerModel.prototype.defaults, {
        _view_name : 'LeafletHeatmapView',
        _model_name : 'LeafletHeatmapModel',

        locations : [],
        minOpacity: 0.05,
        maxZoom: 18,
        max: 1.0,
        radius: 25.0,
        blur: 15.0,
        gradient: {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}
    })
});
