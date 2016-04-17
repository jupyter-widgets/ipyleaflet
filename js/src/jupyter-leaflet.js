var widgets = require('jupyter-js-widgets');
var _ = require('underscore');
var L = require('leaflet');
require('leaflet-draw');


function camel_case(input) {
    // Convert from foo_bar to fooBar
    return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

var LeafletLayerView = widgets.WidgetView.extend({

    initialize: function (parameters) {
        LeafletLayerView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    render: function () {
        this.create_obj();
        this.leaflet_events();
        this.model_events();
    },

    leaflet_events: function () {
    },

    model_events: function () {
    },

    get_options: function () {
        var o = this.model.get('options');
        var options = {};
        var key;
        for (var i=0; i<o.length; i++) {
            key = o[i];
            // Convert from foo_bar to fooBar that Leaflet.js uses
            options[camel_case(key)] = this.model.get(key);
        }
        return options;
    },
});


// UILayer
var LeafletUILayerView = LeafletLayerView.extend({
});


var LeafletMarkerView = LeafletUILayerView.extend({

    create_obj: function () {
        this.obj = L.marker(
            this.model.get('location'),
            this.get_options()
        );
    },

    model_events: function () {
        LeafletMarkerView.__super__.model_events.apply(this, arguments);
        this.listenTo(this.model, 'change:opacity', function () {
            this.obj.setOpacity(this.model.get('opacity'));
        }, this);
    },
});


var LeafletPopupView = LeafletUILayerView.extend({
});


// RasterLayer
var LeafletRasterLayerView = LeafletLayerView.extend({
});


var LeafletTileLayerView = LeafletRasterLayerView.extend({

    create_obj: function () {
        this.obj = L.tileLayer(
            this.model.get('url'),
            this.get_options()
        );
    },
});


var LeafletImageOverlayView = LeafletRasterLayerView.extend({

    create_obj: function () {
        this.obj = L.imageOverlay(
            this.model.get('url'),
            this.model.get('bounds'),
            this.get_options()
        );
    },
});


// VectorLayer
var LeafletVectorLayerView = LeafletLayerView.extend({
});


var LeafletPathView = LeafletVectorLayerView.extend({

    model_events: function () {
        LeafletPathView.__super__.model_events.apply(this, arguments);
        var key;
        var o = this.model.get('options');
        for (var i=0; i<o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, function () {
                this.obj.setStyle(this.get_options());
            }, this);
        }
    },

});


var LeafletPolylineView = LeafletPathView.extend({
    create_obj: function () {
        this.obj = L.polyline(
            this.model.get('locations'),
            this.get_options()
        );
    },
});

var LeafletPolygonView = LeafletPolylineView.extend({
    create_obj: function () {
        this.obj = L.polygon(this.model.get('locations'), this.get_options());
    },
});


var LeafletRectangleView = LeafletPolygonView.extend({
    create_obj: function () {
        this.obj = L.rectangle(
            this.model.get('bounds'),
            this.get_options()
        );
    },
});


var LeafletCircleView = LeafletPathView.extend({
    create_obj: function () {
        this.obj = L.circle(
            this.model.get('location'), this.model.get('radius'),
            this.get_options()
        );
    },
});


var LeafletCircleMarkerView = LeafletCircleView.extend({
    create_obj: function () {
        this.obj = L.circleMarker(
            this.model.get('location'), this.model.get('radius'),
            this.get_options()
        );
    },
});


var LeafletLayerGroupView = LeafletLayerView.extend({
    create_obj: function () {
        this.obj = L.layerGroup();
    },
});


var LeafletFeatureGroupView = LeafletLayerGroupView.extend({
    create_obj: function () {
        this.obj = L.featureGroup();
    },
});


var LeafletMultiPolylineView = LeafletFeatureGroupView.extend({
});


var LeafletGeoJSONView = LeafletFeatureGroupView.extend({
    create_obj: function () {
        var style = this.model.get('style');
        if (_.isEmpty(style)) {
            style = function (feature) {
                return feature.properties.style;
            }
        }
        this.obj = L.geoJson(this.model.get('data'), {style: style});
    },
});


var LeafletMultiPolygonView = LeafletFeatureGroupView.extend({
});


var LeafletControlView = widgets.WidgetView.extend({
    initialize: function (parameters) {
        LeafletControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },
});


var LeafletDrawControlView = LeafletControlView.extend({
    initialize: function (parameters) {
        LeafletDrawControlView.__super__.initialize.apply(this, arguments);
        this.map_view = this.options.map_view;
    },

    render: function () {
        var that = this;
        this.create_child_view(this.model.get('layer'), {
            map_view: this.map_view
        }).then(function (layer_view) {
            this.map_view.obj.addLayer(layer_view.obj);
            // TODO: create_obj refers to the layer view instead of the layer
            // view promise. We should fix that.
            this.layer_view = layer_view;
            this.create_obj();
        });
    },

    create_obj: function () {
        var that = this;
        var polyline = this.model.get('polyline');
        if (_.isEmpty(polyline)) { polyline = false; }
        var polygon = this.model.get('polygon');
        if (_.isEmpty(polygon)) { polygon = false; }
        var circle = this.model.get('circle');
        if (_.isEmpty(circle)) { circle = false; }
        var rectangle = this.model.get('rectangle');
        if (_.isEmpty(rectangle)) { rectangle = false; }
        var marker = this.model.get('marker');
        if (_.isEmpty(marker)) { marker = false; }
        var edit = this.model.get('edit')
        var remove = this.model.get('remove');
        this.obj = new L.Control.Draw({
            edit: {
                featureGroup: this.layer_view.obj,
                edit: edit,
                remove: remove
            },
            draw: {
                polyline: polyline,
                polygon: polygon,
                circle: circle,
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
            that.layer_view.obj.addLayer(layer);
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
    },

});


var LeafletMapModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
        _view_name: "LeafletMapView",
        _model_name: "LeafletMapModel",
        _model_module: "jupyter-leaflet",
        _view_module: "jupyter-leaflet",

        center: [],
        width: "600px",
        height: "400px",
        zoom_start: 12,
        zoom: 12,
        max_zoom: 18,
        min_zoom: 1,

        dragging: true,
        touch_zoom: true,
        scroll_wheel_zoom: false,
        double_click_zoom: true,
        box_zoom: true,
        tap: true,
        tap_tolerance: 15,
        world_copy_jump: false,
        close_popup_on_click: true,
        bounce_at_zoom_limits: true,
        keyboard: true,
        keyboard_pan_offset: 80,
        keyboard_zoom_offset: 1,
        inertia: true,
        inertia_deceleration: 3000,
        inertia_max_speed: 1500,
        // inertia_threshold: int(?)
        zoom_control: true,
        attribution_control: true,
        // fade_animation: bool(?),
        // zoom_animation: bool(?),
        zoom_animation_threshold: 4,
        // marker_zoom_animation: bool(?),
        options: [],
        layers: [],
        controls: []
    }),
}, {
    serializers: _.extend({
        layers: { deserialize: widgets.unpack_models },
        controls: { deserialize: widgets.unpack_models },
    }, widgets.DOMWidgetModel.serializers),
});

var LeafletMapView = widgets.DOMWidgetView.extend({
    initialize: function (options) {
        LeafletMapView.__super__.initialize.apply(this, arguments);
    },

    remove_layer_view: function (child_view) {
        this.obj.removeLayer(child_view.obj);
        child_view.remove();
    },

    add_layer_model: function (child_model) {
        var that = this;
        return this.create_child_view(child_model, {
            map_view: this
        }).then(function (child_view) {
            that.obj.addLayer(child_view.obj);
        });
    },

    remove_control_view: function (child_view) {
        this.obj.removeControl(child_view.obj);
        child_view.remove();
    },

    add_control_model: function (child_model) {
        var that = this;
        return this.create_child_view(child_model, {
            map_view: this
        }).then(function (child_view) {
            that.obj.addControl(child_view.obj);
        });
    },

    render: function () {
        this.el.style['width'] = this.model.get('width');
        this.el.style['height'] = this.model.get('height');
        this.layer_views = new widgets.ViewList(this.add_layer_model, this.remove_layer_model, this);
        this.control_views = new widgets.ViewList(this.add_control_model, this.remove_control_model, this);
        this.displayed.then(_.bind(this.render_leaflet, this));
    },

    render_leaflet: function () {
        this.create_obj();
        this.layer_views.update(this.model.get('layers'));
        this.control_views.update(this.model.get('controls'));
        this.leaflet_events();
        this.model_events();
        this.update_bounds();
    },

    create_obj: function () {
        this.obj = L.map(this.el, this.get_options());
    },

    get_options: function () {
        var o = this.model.get('options');
        var options = {};
        var key;
        for (var i=0; i<o.length; i++) {
            key = o[i];
            // Convert from foo_bar to fooBar that Leaflet.js uses
            options[camel_case(key)] = this.model.get(key);
        }
        return options;
    },

    leaflet_events: function () {
        var that = this;
        this.obj.on('moveend', function (e) {
            var c = e.target.getCenter();
            that.model.set('center', [c.lat, c.lng]);
            that.touch();
            that.update_bounds();
        });
        this.obj.on('zoomend', function (e) {
            var z = e.target.getZoom();
            that.model.set('zoom', z);
            that.touch();
            that.update_bounds();
        });
    },

    update_bounds: function () {
        var b = this.obj.getBounds();
        this.model.set('_north', b.getNorth());
        this.model.set('_south', b.getSouth());
        this.model.set('_east', b.getEast());
        this.model.set('_west', b.getWest());
        this.touch();
    },

    model_events: function () {
        var that = this;
        this.listenTo(this.model, 'msg:custom', this.handle_msg, this);
        this.listenTo(this.model, 'change:layers', this.update_layers, this);
        this.listenTo(this.model, 'change:controls', this.update_controls, this);
        this.listenTo(this.model, 'change:zoom', function () {
            this.obj.setZoom(this.model.get('zoom'));
            this.update_bounds();
        }, this);
        this.listenTo(this.model, 'change:center', function () {
            this.obj.panTo(this.model.get('center'));
            this.update_bounds();
        }, this);
    },

    handle_msg: function (content) {
        switch(content.method) {
            case 'foo':
                break;
        }
    },
});

module.exports = {
    LeafletLayerView : LeafletLayerView,
    LeafletUILayerView : LeafletUILayerView,
    LeafletMarkerView : LeafletMarkerView,
    LeafletPopupView : LeafletPopupView,
    LeafletRasterLayerView : LeafletRasterLayerView,
    LeafletTileLayerView : LeafletTileLayerView,
    LeafletImageOverlayView : LeafletImageOverlayView,
    LeafletVectorLayerView : LeafletVectorLayerView,
    LeafletPathView : LeafletPathView,
    LeafletPolylineView : LeafletPolylineView,
    LeafletPolygonView : LeafletPolygonView,
    LeafletRectangleView : LeafletRectangleView,
    LeafletCircleView : LeafletCircleView,
    LeafletCircleMarkerView : LeafletCircleMarkerView,
    LeafletLayerGroupView : LeafletLayerGroupView,
    LeafletFeatureGroupView : LeafletFeatureGroupView,
    LeafletMultiPolylineView : LeafletMultiPolylineView,
    LeafletGeoJSONView : LeafletGeoJSONView,
    LeafletMultiPolygonView : LeafletMultiPolygonView,
    LeafletControlView : LeafletControlView,
    LeafletDrawControlView : LeafletDrawControlView,
    LeafletMapView : LeafletMapView,
    LeafletMapModel : LeafletMapModel
};
