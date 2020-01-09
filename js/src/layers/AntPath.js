// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var vectorlayer = require('./VectorLayer.js');
var LeafletVectorLayerView = vectorlayer.LeafletVectorLayerView;
var LeafletVectorLayerModel = vectorlayer.LeafletVectorLayerModel;
var {antPath} = require('leaflet-ant-path');

var LeafletAntPathModel = LeafletVectorLayerModel.extend({
    defaults: _.extend({}, LeafletVectorLayerModel.prototype.defaults, {
        _view_name : 'LeafletAntPathView',
        _model_name : 'LeafletAntPathModel',

        use : 'polyline',
        delay : 400,
        weight : 5,
        dash_array : [10, 20],
        color : '#0000FF',
        pulse_color : '#FFFFFF',
        paused : false,
        reverse : false,
        hardware_accelerated : false,
        radius : 10
    })
});

var LeafletAntPathView = LeafletVectorLayerView.extend({
    create_obj: function () {
        this.obj = antPath(this.model.get('locations'), this.get_ant_options());
    },

    model_events: function () {
        LeafletAntPathView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:locations', function () {
            this.obj.setLatLngs(this.model.get('locations'));
        }, this);
        this.model.on_some_change(this.model.get('options'), () => {
            this.obj.setStyle(this.get_ant_options());
        });

        this.obj.setStyle(this.get_ant_options());
    },

    get_ant_options: function() {
        var options = this.get_options();
        if (options.use != "circle") {
            delete options.radius;
        }
        options.use = L[options.use];
        return options;
    },

});

module.exports = {
  LeafletAntPathView : LeafletAntPathView,
  LeafletAntPathModel : LeafletAntPathModel,
};
