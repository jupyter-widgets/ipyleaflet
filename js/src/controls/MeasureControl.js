var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletMeasureControlModel = LeafletControlModel.extend({
  defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name: 'LeafletMeasureControlView',
        _model_name: 'LeafletMeasureControlModel',

        primary_length_unit: 'feet',
        secondary_length_unit: undefined,
        primary_area_unit: 'acres',
        secondar_area_unit: undefined,
        active_color: '#ABE67E',
        completed_color: '#C8F2BE',
        popup_options: {
          className: 'leaflet-measure-resultpopup',
          autoPanPadding: [10, 10]
        },
        capture_z_index: 10000,
        _custom_units: {},
    })
});

var LeafletMeasureControlView = LeafletControlView.extend({
  initialize: function (parameters) {
        LeafletMeasureControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    create_obj: function () {
        this.obj = L.control.measure(this.get_options());
        this.default_units = L.extend({}, this.obj.options.units);
    },

    get_options: function () {
        var options = LeafletMeasureControlView.__super__.get_options.apply(this, arguments);
        options['units'] = L.extend({}, this.default_units, this.model.get('_custom_units'));
        return options;
    },

    model_events: function () {
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                // Workaround for https://github.com/ljagis/leaflet-measure/issues/112
                // and https://github.com/ljagis/leaflet-measure/issues/113
                // Once fixed, the next line should be replaced by: L.setOptions(this.obj, this.get_options());
                this.obj.initialize(this.get_options());
            }, this);
        }
    },
});

module.exports = {
  LeafletMeasureControlView : LeafletMeasureControlView,
  LeafletMeasureControlModel : LeafletMeasureControlModel,
};
