



var LeafletVelocityModel = LeafletLayerModel.extend({
    defaults: _.extend({}, LeafletLayerModel.prototype.defaults, {
        _view_name : 'LeafletVelocityView',
        _model_name : 'LeafletVelocityModel',

        displayValues: true,
        displayOptions: {
            velocityType: 'Global Wind',
            position: 'bottomleft',
            emptyString: 'No velocity data',
            angleConvention: 'bearingCW',
            displayPosition: 'bottomleft',
            displayEmptyString: 'No velocity data',
            speedUnit: 'kt'
        },
        data: [],
        minVelocity: 0,
        maxVelocity: 10,
        velocityScale: 0.005,
        colorScale: []
    })
});
