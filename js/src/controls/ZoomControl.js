var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletZoomControlModel = LeafletControlModel.extend({
    defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletZoomControlView',
        _model_name: 'LeafletZoomControlModel',

        zoom_in_text: '+',
        zoom_in_title: 'Zoom in',
        zoom_out_text: '-',
        zoom_out_title: 'Zoom out',

    })
});

var LeafletZoomControlView = LeafletControlView.extend({
    initialize: function (parameters) {
        LeafletZoomControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    create_obj: function () {
        this.obj = L.control.zoom(this.get_options());
    },
});

module.exports = {
    LeafletZoomControlView : LeafletZoomControlView,
    LeafletZoomControlModel : LeafletZoomControlModel,
};
