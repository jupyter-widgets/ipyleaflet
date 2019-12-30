// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var path = require('./Path.js');
var def_loc = [0.0, 0.0];

var LeafletCircleMarkerModel = path.LeafletPathModel.extend({
    defaults: _.extend({}, path.LeafletPathModel.prototype.defaults, {
        _view_name : 'LeafletCircleMarkerView',
        _model_name : 'LeafletCircleMarkerModel',
        location : def_loc
    })
});

var LeafletCircleMarkerView = path.LeafletPathView.extend({
    create_obj: function () {
        this.obj = L.circleMarker(
            this.model.get('location'), this.get_options()
        );
    },

    model_events: function () {
        LeafletCircleMarkerView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:location', function () {
            this.obj.setLatLng(this.model.get('location'));
        }, this);
    },
});

module.exports = {
  LeafletCircleMarkerView : LeafletCircleMarkerView,
  LeafletCircleMarkerModel : LeafletCircleMarkerModel,
};
