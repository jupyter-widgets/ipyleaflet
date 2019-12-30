// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletAttributionControlModel = LeafletControlModel.extend({
    defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletAttributionControlView',
        _model_name: 'LeafletAttributionControlModel',

    })
});

var LeafletAttributionControlView = LeafletControlView.extend({
    initialize: function (parameters) {
        LeafletAttributionControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    create_obj: function () {
        this.obj = L.control.attribution(this.get_options());
    },
});

module.exports = {
    LeafletAttributionControlView : LeafletAttributionControlView,
    LeafletAttributionControlModel : LeafletAttributionControlModel,
};
