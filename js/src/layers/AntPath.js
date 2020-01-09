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
        _model_name : 'LeafletAntPathModel'
    })
});

var LeafletAntPathView = LeafletVectorLayerView.extend({
    create_obj: function () {
        this.obj = antPath(this.model.get('locations'), this.get_ant_options());
    },

    model_events: function () {
        LeafletAntPathView.__super__.model_events.apply(this, arguments);
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                this.obj.setStyle(this.get_ant_options());
            }, this);
        }

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
