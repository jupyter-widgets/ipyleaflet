var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletFullScreenControlModel = LeafletControlModel.extend({
    defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletFullScreenControlView',
        _model_name: 'LeafletFullScreenControlModel',
    })
});

var LeafletFullScreenControlView = LeafletControlView.extend({
    initialize: function (parameters) {
        LeafletFullScreenControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    create_obj: function () {
        this.obj = L.control.fullscreen();
    },
});

module.exports = {
    LeafletFullScreenControlView : LeafletFullScreenControlView,
    LeafletFullScreenControlModel : LeafletFullScreenControlModel,
};
