var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('../leaflet.js');
var control = require('./Control.js');
var LeafletControlView = control.LeafletControlView;
var LeafletControlModel = control.LeafletControlModel;

var LeafletDrawControlModel = LeafletControlModel.extend({
  defaults: _.extend({}, LeafletControlModel.prototype.defaults, {
        _view_name : 'LeafletDrawControlView',
        _model_name : 'LeafletDrawControlModel',

        polyline : { shapeOptions : {} },
        polygon : { shapeOptions : {} },
        circle : {},
        circlemarker : {},
        rectangle : {},
        marker : {},
        edit : true,
        remove : true
    })
}, {
    serializers: _.extend({
        layer : { deserialize: widgets.unpack_models }
      }, LeafletControlModel.serializers)
});

var LeafletDrawControlView = LeafletControlView.extend({
  initialize: function (parameters) {
        LeafletDrawControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    create_obj: function () {
        var that = this;
        this.feature_group = L.featureGroup();
        this.map_view.obj.addLayer(this.feature_group);
        var polyline = this.model.get('polyline');
        if (_.isEmpty(polyline)) { polyline = false; }
        var polygon = this.model.get('polygon');
        if (_.isEmpty(polygon)) { polygon = false; }
        var circle = this.model.get('circle');
        if (_.isEmpty(circle)) { circle = false; }
        var circlemarker = this.model.get('circlemarker');
        if (_.isEmpty(circlemarker)) { circlemarker = false; }
        var rectangle = this.model.get('rectangle');
        if (_.isEmpty(rectangle)) { rectangle = false; }
        var marker = this.model.get('marker');
        if (_.isEmpty(marker)) { marker = false; }
        this.obj = new L.Control.Draw({
            edit: {
                featureGroup: this.feature_group,
                edit: this.model.get('edit'),
                remove: this.model.get('remove')
            },
            draw: {
                polyline: polyline,
                polygon: polygon,
                circle: circle,
                circlemarker: circlemarker,
                rectangle: rectangle,
                marker: marker
            }
        });
        this.map_view.obj.on('draw:created', function (e) {
            var type = e.layerType;
            var layer = e.layer;
            var geo_json = layer.toGeoJSON();
            geo_json.properties.style = layer.options;
            that.send({
                'event': 'draw:created',
                'geo_json': geo_json
            });
            that.feature_group.addLayer(layer);
        });
        this.map_view.obj.on('draw:edited', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                var geo_json = layer.toGeoJSON();
                geo_json.properties.style = layer.options;
                that.send({
                    'event': 'draw:edited',
                    'geo_json': geo_json
                });
            });
        });
        this.map_view.obj.on('draw:deleted', function (e) {
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                var geo_json = layer.toGeoJSON();
                geo_json.properties.style = layer.options;
                that.send({
                    'event': 'draw:deleted',
                    'geo_json': geo_json
                });
            });
        });
        this.model.on('msg:custom', _.bind(this.handle_message, this));
    },

    handle_message: function(content) {
        if (content.msg == 'clear') {
            this.feature_group.eachLayer((layer) => {
                this.feature_group.removeLayer(layer);
            });
        } else if (content.msg == 'clear_polylines') {
            this.feature_group.eachLayer((layer) => {
                if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
                    this.feature_group.removeLayer(layer);
                }
            });
        } else if (content.msg == 'clear_polygons') {
            this.feature_group.eachLayer((layer) => {
                if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
                    this.feature_group.removeLayer(layer);
                }
            });
        } else if (content.msg == 'clear_circles') {
            this.feature_group.eachLayer((layer) => {
                if (layer instanceof L.CircleMarker) {
                    this.feature_group.removeLayer(layer);
                }
            });
        } else if (content.msg == 'clear_circle_markers') {
            this.feature_group.eachLayer((layer) => {
                if (layer instanceof L.CircleMarker && !(layer instanceof L.Circle)) {
                    this.feature_group.removeLayer(layer);
                }
            });
        } else if (content.msg == 'clear_rectangles') {
            this.feature_group.eachLayer((layer) => {
                if (layer instanceof L.Rectangle) {
                    this.feature_group.removeLayer(layer);
                }
            });
        } else if (content.msg == 'clear_markers') {
            this.feature_group.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    this.feature_group.removeLayer(layer);
                }
            });
        }
    }
});

module.exports = {
  LeafletDrawControlView : LeafletDrawControlView,
  LeafletDrawControlModel : LeafletDrawControlModel,
};
