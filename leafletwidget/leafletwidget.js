require.config({
    paths: {
        leaflet: "/nbextensions/leafletwidget/leaflet/0.7.3/leaflet",
        leaflet_draw: "/nbextensions/leafletwidget/leaflet.draw/0.2.4/leaflet.draw"
    },
    shim: {
	leaflet_draw: {deps: ['leaflet']},
	leaflet: {exports: 'L'}
    },
});

define(['jqueryui','widgets/js/manager','widgets/js/widget', "leaflet", "leaflet_draw"], function($, manager, widget, L) {
    console.log("loading leafletwidget");
    
    // Load the leaflet css.
    var load_css = function(path) {
        $('<link>')
            .appendTo('head')
            .attr({type: 'text/css', rel: 'stylesheet'})
            .attr('href', path);
    };    
    load_css('/nbextensions/leafletwidget/leaflet/0.7.3/leaflet.css');
    load_css('/nbextensions/leafletwidget/leaflet.draw/0.2.4/leaflet.draw.css');

    function camel_case(input) {
        // Convert from foo_bar to fooBar 
        return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
    
    var LeafletLayerView = widget.WidgetView.extend({
        
        initialize: function (parameters) {
            LeafletLayerView.__super__.initialize.apply(this,[parameters]);
            // Remove this line after testing...
            this.model.on('displayed', this.test_display, this);
            this.map_view = this.options.map_view;
        },
    
        // Remove this method after testing...
        test_display: function () {
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
    manager.WidgetManager.register_widget_view('LeafletLayerView', LeafletLayerView);


    // UILayer
    var LeafletUILayerView = LeafletLayerView.extend({
    });
    manager.WidgetManager.register_widget_view('LeafletUILayerView', LeafletUILayerView);
    
    
    var LeafletMarkerView = LeafletUILayerView.extend({
        
        create_obj: function () {
            this.obj = L.marker(
                this.model.get('location'),
                this.get_options()
            );
        },

        model_events: function () {
            LeafletMarkerView.__super__.model_events.apply(this, arguments);
            var that = this;
            this.model.on('change:opacity', function () {
                that.obj.setOpacity(that.model.get('opacity'));
            });
        },

    });
    manager.WidgetManager.register_widget_view('LeafletMarkerView', LeafletMarkerView);
    
    
    var LeafletPopupView = LeafletUILayerView.extend({
    });
    manager.WidgetManager.register_widget_view('LeafletPopupView', LeafletPopupView);
    
    
    // RasterLayer
    var LeafletRasterLayerView = LeafletLayerView.extend({
    });
    manager.WidgetManager.register_widget_view('LeafletRasterLayerView', LeafletRasterLayerView);
    
    
    var LeafletTileLayerView = LeafletRasterLayerView.extend({
        
        create_obj: function () {
            this.obj = L.tileLayer(
                this.model.get('url'),
                this.get_options()
            );
        },
        
    });
    manager.WidgetManager.register_widget_view('LeafletTileLayerView', LeafletTileLayerView);
    
    
    var LeafletImageOverlayView = LeafletRasterLayerView.extend({
        
        create_obj: function () {
            this.obj = L.imageOverlay(
                this.model.get('url'),
                this.model.get('bounds'),
                this.get_options()
            );
        },
        
    });
    manager.WidgetManager.register_widget_view('LeafletImageOverlayView', LeafletImageOverlayView);
    
    
    // VectorLayer
    var LeafletVectorLayerView = LeafletLayerView.extend({
    });
    manager.WidgetManager.register_widget_view('LeafletVectorLayerView', LeafletVectorLayerView);
    
    
    var LeafletPathView = LeafletVectorLayerView.extend({
        
        model_events: function () {
            LeafletPathView.__super__.model_events.apply(this, arguments);
            var that = this;
            var key;
            var o = this.model.get('options');
            for (var i=0; i<o.length; i++) {
                key = o[i];
                this.model.on('change:'+key, function () {
                    that.obj.setStyle(that.get_options())
                })
            }
        },

    });
    manager.WidgetManager.register_widget_view('LeafletPathView', LeafletPathView);
    
    
    var LeafletPolylineView = LeafletPathView.extend({
        
        create_obj: function () {
            this.obj = L.polyline(
                this.model.get('locations'),
                this.get_options()
            );
        },
        
    });
    manager.WidgetManager.register_widget_view('LeafletPolylineView', LeafletPolylineView);
    
    
    var LeafletPolygonView = LeafletPolylineView.extend({
    
        create_obj: function () {
            this.obj = L.polygon(this.model.get('locations'), this.get_options());
        },
    
    });
    manager.WidgetManager.register_widget_view('LeafletPolygonView', LeafletPolygonView);
    
    
    var LeafletRectangleView = LeafletPolygonView.extend({
        
        create_obj: function () {
            this.obj = L.rectangle(
                this.model.get('bounds'),
                this.get_options()
            );
        },

    });
    manager.WidgetManager.register_widget_view('LeafletRectangleView', LeafletRectangleView);
    
    
    var LeafletCircleView = LeafletPathView.extend({
        
        create_obj: function () {
            this.obj = L.circle(
                this.model.get('location'), this.model.get('radius'),
                this.get_options()
            );
        },
    
    });
    manager.WidgetManager.register_widget_view('LeafletCircleView', LeafletCircleView);
    
    
    var LeafletCircleMarkerView = LeafletCircleView.extend({
    
        create_obj: function () {
            this.obj = L.circleMarker(
                this.model.get('location'), this.model.get('radius'),
                this.get_options()
            );
        },
    
    });
    manager.WidgetManager.register_widget_view('LeafletCircleMarkerView', LeafletCircleMarkerView);
    
    
    // LayerGroup
    var LeafletLayerGroupView = LeafletLayerView.extend({
        
        create_obj: function () {
            this.obj = L.layerGroup();
        },
        
    });
    manager.WidgetManager.register_widget_view('LeafletLayerGroupView', LeafletLayerGroupView);
    
    
    var LeafletFeatureGroupView = LeafletLayerGroupView.extend({
        
        create_obj: function () {
            this.obj = L.featureGroup();
        },
        
    });
    manager.WidgetManager.register_widget_view('LeafletFeatureGroupView', LeafletFeatureGroupView);
    
    
    var LeafletMultiPolylineView = LeafletFeatureGroupView.extend({
    });
    manager.WidgetManager.register_widget_view('LeafletMultiPolylineView', LeafletMultiPolylineView);
    
    
    var LeafletGeoJSONView = LeafletFeatureGroupView.extend({
    
        create_obj: function () {
            var style = this.model.get('style');
            if ($.isEmptyObject(style)) {
                style = function (feature) {
                    return feature.properties.style;
                } 
            }
            this.obj = L.geoJson(this.model.get('data'), {style: style});
        },
    });
    manager.WidgetManager.register_widget_view('LeafletGeoJSONView', LeafletGeoJSONView);


    var LeafletMultiPolygonView = LeafletFeatureGroupView.extend({
    });
    manager.WidgetManager.register_widget_view('LeafletMultiPolygonView', LeafletMultiPolygonView);


    var LeafletControlView = widget.WidgetView.extend({
        
        initialize: function (parameters) {
            LeafletControlView.__super__.initialize.apply(this,[parameters]);
            this.map_view = this.options.map_view;
        },

    });
    manager.WidgetManager.register_widget_view('LeafletControlView', LeafletControlView);


    var LeafletDrawControlView = LeafletControlView.extend({
        
        initialize: function (parameters) {
            LeafletDrawControlView.__super__.initialize.apply(this,[parameters]);
            var that = this;
            this.obj_promise = new Promise(function(resolve) {
                that._resolve_obj = resolve;
            });
            this.map_view = this.options.map_view;
        },

        render: function () {
            var layer = this.model.get('layer');
            var that = this;
            this.create_child_view(layer, {map_view: this.map_view}).then(function(layer_view) {
                that.layer_view = layer_view;
                that.map_view.obj.addLayer(that.layer_view.obj);
                that.create_obj();
                that._resolve_obj(that.obj);
            });
        },

        create_obj: function () {
            var that = this;
            var polyline = this.model.get('polyline');
            if ($.isEmptyObject(polyline)) {polyline=false;}
            var polygon = this.model.get('polygon');
            if ($.isEmptyObject(polygon)) {polygon=false;}
            var circle = this.model.get('circle');
            if ($.isEmptyObject(circle)) {circle=false;}
            var rectangle = this.model.get('rectangle');
            if ($.isEmptyObject(rectangle)) {rectangle=false;}
            var marker = this.model.get('marker');
            if ($.isEmptyObject(marker)) {marker=false;}
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
    manager.WidgetManager.register_widget_view('LeafletDrawControlView', LeafletDrawControlView);


    var LeafletMapView = widget.DOMWidgetView.extend({
        
        initialize: function() {
            console.log('MapView initialized');
            LeafletMapView.__super__.initialize.apply(this,arguments);
            this.rendered=false;
        },
    
        remove_layer_view: function(view) {
            this.obj.removeLayer(view.obj);
        },
    
        add_layer_model: function(child_model) {
            var that = this;
            return this.create_child_view(child_model, {map_view: this}).then(function(child_view) {
                that.obj.addLayer(child_view.obj);
                return child_view;
            });
        },

        remove_control_view: function(view) {
            var that = this;
            view.obj_promise.then(function(obj) {
                that.obj.removeControl(obj);
            });
        },

        add_control_model: function(child_model) {
            var that = this;
            return this.create_child_view(child_model, {map_view: this}).then(function(child_view) {
                child_view.obj_promise.then(function(obj) {
                    that.obj.addControl(obj);
                });
                return child_view;
            });
        },

        // Rendering
        render: function () {
	    console.log("Rendering");
            this.$el.width(this.model.get('width')).height(this.model.get('height'));
            this.on('displayed', this.render_leaflet, this);
        },
    
        render_leaflet: function () {
	    console.log("render_leaflet");
            if (!this.rendered) {
                var that = this;
		console.log("create_obj");
                this.create_obj();
		console.log("leafletevents");
                this.leaflet_events();
		console.log("model events");
                this.model_events();
		console.log("update bounds");
                this.update_bounds();
                this.rendered = true;
            }
        },

        create_obj: function () {
            this.obj = L.map(this.$el.get(0), this.get_options());
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
            this.model.on('msg:custom', this.handle_msg, this);

            this.layer_views = new widget.ViewList(this.add_layer_model, this.remove_layer_view, this);
            this.listenTo(this.model, 'change:layers', function(model, value) {
                this.layer_views.update(value);
            }, this);
            this.layer_views.update(this.model.get('layers'));

            this.control_views = new widget.ViewList(this.add_control_model, this.remove_control_view, this);
            this.listenTo(this.model, 'change:controls', function(model, value) {
                this.control_views.update(value);
            }, this);
            this.control_views.update(this.model.get('controls'));

            this.model.on('change:zoom', function () {
                that.obj.setZoom(that.model.get('zoom'));
                that.update_bounds();
            });
            this.model.on('change:center', function () {
                that.obj.panTo(that.model.get('center'));
                that.update_bounds();
            });
        },
        
        handle_msg: function (content) {
            switch(content.method) {
                case 'foo':
                    break;
            }
        },
    
    });
    manager.WidgetManager.register_widget_view('LeafletMapView', LeafletMapView);

    return {
        LeafletMapView: LeafletMapView,	
        LeafletLayerView: LeafletLayerView,
        LeafletUILayerView: LeafletUILayerView,
        LeafletMarkerView: LeafletMarkerView,
        LeafletPopupView: LeafletPopupView,
        LeafletRasterLayerView: LeafletRasterLayerView,
        LeafletTileLayerView: LeafletTileLayerView,
        LeafletImageOverlayView: LeafletImageOverlayView,
        LeafletVectorLayerView: LeafletVectorLayerView,
        LeafletPathView: LeafletPathView,
        LeafletPolylineView: LeafletPolylineView,
        LeafletPolygonView: LeafletPolygonView,
        LeafletRectangleView: LeafletRectangleView,
        LeafletCircleView: LeafletCircleView,
        LeafletCircleMarkerView: LeafletCircleMarkerView,
        LeafletLayerGroupView: LeafletLayerGroupView,
        LeafletFeatureGroupView: LeafletFeatureGroupView,
        LeafletMultiPolylineView: LeafletMultiPolylineView,
        LeafletGeoJSONView: LeafletGeoJSONView,
        LeafletMultiPolygonView: LeafletMultiPolygonView,
        LeafletControlView: LeafletControlView,
        LeafletDrawControlView: LeafletDrawControlView,
    }
});
