// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var circlemarker = require('./CircleMarker.js');

var LeafletCircleModel = circlemarker.LeafletCircleMarkerModel.extend({
    defaults: _.extend({}, circlemarker.LeafletCircleMarkerModel.prototype.defaults, {
        _view_name : 'LeafletCircleView',
        _model_name : 'LeafletCircleModel'
    })
});

var LeafletCircleView = circlemarker.LeafletCircleMarkerView.extend({
    create_obj: function () {
        this.obj = L.circle(
            this.model.get('location'), this.get_options()
        );
    },

    model_events: function () {
        LeafletCircleView.__super__.model_events.apply(this, arguments);

        // Workaround for https://github.com/Leaflet/Leaflet/pull/6128
        this.listenTo(this.model, 'change:radius', function () {
            this.obj.setRadius(this.get_options().radius);
        }, this);
    },
});

module.exports = {
  LeafletCircleView : LeafletCircleView,
  LeafletCircleModel : LeafletCircleModel,
};
