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
        options : []
    })
});

var LeafletControlView = utils.LeafletWidgetView.extend({
    initialize: function (parameters) {
        LeafletControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },
});

module.exports = {
  LeafletControlView : LeafletControlView,
  LeafletControlModel : LeafletControlModel,
};
