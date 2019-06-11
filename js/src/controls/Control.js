var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var utils = require('../utils.js');

var LeafletControlModel = widgets.WidgetModel.extend({
    defaults: _.extend({}, widgets.WidgetModel.prototype.defaults, {
        _view_name : 'LeafletControlView',
        _model_name : 'LeafletControlModel',
        _view_module : 'jupyter-leaflet',
        _model_module : 'jupyter-leaflet',
        options : [],
        position: 'topleft',
    })
});

var LeafletControlView = utils.LeafletWidgetView.extend({
    initialize: function (parameters) {
        LeafletControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    render: function () {
        return Promise.resolve(this.create_obj()).then(() => {
            this.leaflet_events();
            this.model_events();
        });
    },

    leaflet_events: function () {
    },

    model_events: function () {
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                L.setOptions(this.obj, this.get_options());
            }, this);
        }
    },
});

module.exports = {
    LeafletControlView: LeafletControlView,
    LeafletControlModel: LeafletControlModel,
};
