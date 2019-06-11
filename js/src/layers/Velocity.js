var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js')
var layer = require('./Layer.js');
var LeafletLayerView = layer.LeafletLayerView;
var LeafletLayerModel = layer.LeafletLayerModel;

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

var LeafletVelocityView = layer.LeafletLayerView.extend({
    create_obj: function () {
        var options = this.get_options();
        options.data = this.model.get('data');
        this.obj = L.velocityLayer(
            options
        );
    },

    model_events: function () {
        LeafletVelocityView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:data', function () {
            data = this.model.get('data');
            this.obj.setData(data);
        }, this);
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                var options = this.get_options();
                L.setOptions(this.obj, options);
            }, this);
        }
        // Separate display_options from the options to perform a shallow copy.
        key = 'display_options';
        this.listenTo(this.model, 'change:' + key, function () {
            var options = {};
            options[camel_case(key)] = _.extend({}, this.model.get(key));
            L.setOptions(this.obj, options);
        }, this);
    },
});

module.exports = {
  LeafletVelocityView : LeafletVelocityView,
  LeafletVelocityModel : LeafletVelocityModel,
};
