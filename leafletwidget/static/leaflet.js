

require.config({
    paths: {
        leaflet: "http://cdn.leafletjs.com/leaflet-0.7.2/leaflet",
        leaflet_draw: "http://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.2.3/leaflet.draw"
    },
    shim: {leaflet_draw: "leaflet"}
});

require(["widgets/js/widget", "leaflet", "leaflet_draw"], function(WidgetManager, L) {

    function camel_case(input) {
        // Convert from foo_bar to fooBar 
        return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
    
    var LeafletLayerView = IPython.WidgetView.extend({
        
        initialize: function (parameters) {
            LeafletLayerView.__super__.initialize.apply(this, arguments);
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
            // this.obj.on('moveend', function (e) {
            //     var c = e.target.getCenter();
            //     that.model.set('center', [c.lat, c.lng]);
            //     that.touch();
            //     that.update_bounds();
            // });
        },

        model_events: function () {
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
    WidgetManager.register_widget_view('LeafletLayerView', LeafletLayerView);


    // UILayer
    var LeafletUILayerView = LeafletLayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletUILayerView', LeafletUILayerView);
    
    
    var LeafletMarkerView = LeafletUILayerView.extend({
        
        create_obj: function () {
            this.obj = L.marker(
                this.model.get('location'),
                this.get_options()
            );
        },
        
    });
    WidgetManager.register_widget_view('LeafletMarkerView', LeafletMarkerView);
    
    
    var LeafletPopupView = LeafletUILayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletPopupView', LeafletPopupView);
    
    
    // RasterLayer
    var LeafletRasterLayerView = LeafletLayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletRasterLayerView', LeafletRasterLayerView);
    
    
    var LeafletTileLayerView = LeafletRasterLayerView.extend({
        
        create_obj: function () {
            this.obj = L.tileLayer(
                this.model.get('url'),
                this.get_options()
            );
        },
        
    });
    WidgetManager.register_widget_view('LeafletTileLayerView', LeafletTileLayerView);
    
    
    var LeafletImageOverlayView = LeafletRasterLayerView.extend({
        
        create_obj: function () {
            this.obj = L.imageOverlay(
                this.model.get('url'),
                this.model.get('bounds'),
                this.get_options()
            );
        },
        
    });
    WidgetManager.register_widget_view('LeafletImageOverlayView', LeafletImageOverlayView);
    
    
    // VectorLayer
    var LeafletVectorLayerView = LeafletLayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletVectorLayerView', LeafletVectorLayerView);
    
    
    var LeafletPathView = LeafletVectorLayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletPathView', LeafletPathView);
    
    
    var LeafletPolylineView = LeafletPathView.extend({
        
        create_obj: function () {
            this.obj = L.polyline(
                this.model.get('locations'),
                this.get_options()
            );
        },
        
    });
    WidgetManager.register_widget_view('LeafletPolylineView', LeafletPolylineView);
    
    
    var LeafletPolygonView = LeafletPolylineView.extend({
    
        create_obj: function () {
            this.obj = L.polygon(this.model.get('locations'), this.get_options());
        },
    
    });
    WidgetManager.register_widget_view('LeafletPolygonView', LeafletPolygonView);
    
    
    var LeafletRectangleView = LeafletPolygonView.extend({
        
        create_obj: function () {
            this.obj = L.rectangle(
                this.model.get('bounds'),
                this.get_options()
            );
        },

    });
    WidgetManager.register_widget_view('LeafletRectangleView', LeafletRectangleView);
    
    
    var LeafletCircleView = LeafletPathView.extend({
        
        create_obj: function () {
            this.obj = L.circle(
                this.model.get('location'), this.model.get('radius'),
                this.get_options()
            );
        },
    
    });
    WidgetManager.register_widget_view('LeafletCircleView', LeafletCircleView);
    
    
    var LeafletCircleMarkerView = LeafletCircleView.extend({
    
        create_obj: function () {
            this.obj = L.circleMarker(
                this.model.get('location'), this.model.get('radius'),
                this.get_options()
            );
        },
    
    });
    WidgetManager.register_widget_view('LeafletCircleMarkerView', LeafletCircleMarkerView);
    
    
    // LayerGroup
    var LeafletLayerGroupView = LeafletLayerView.extend({
        
        create_obj: function () {
            this.obj = L.layerGroup();
        },
        
    });
    WidgetManager.register_widget_view('LeafletLayerGroupView', LeafletLayerGroupView);
    
    
    var LeafletFeatureGroupView = LeafletLayerGroupView.extend({
        
        create_obj: function () {
            this.obj = L.featureGroup();
        },
        
    });
    WidgetManager.register_widget_view('LeafletFeatureGroupView', LeafletFeatureGroupView);
    
    
    var LeafletMultiPolylineView = LeafletFeatureGroupView.extend({
    });
    WidgetManager.register_widget_view('LeafletMultiPolylineView', LeafletMultiPolylineView);
    
    
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
    WidgetManager.register_widget_view('LeafletGeoJSONView', LeafletGeoJSONView);


    var LeafletMultiPolygonView = LeafletFeatureGroupView.extend({
    });
    WidgetManager.register_widget_view('LeafletMultiPolygonView', LeafletMultiPolygonView);


    var LeafletControlView = IPython.WidgetView.extend({
        
        initialize: function (parameters) {
            LeafletControlView.__super__.initialize.apply(this, arguments);
            this.map_view = this.options.map_view;
        },

    });
    WidgetManager.register_widget_view('LeafletControlView', LeafletControlView);


    var LeafletDrawControlView = LeafletControlView.extend({
        
        initialize: function (parameters) {
            LeafletDrawControlView.__super__.initialize.apply(this, arguments);
            this.map_view = this.options.map_view;
        },

        render: function () {
            this.layer_view = this.create_child_view(this.model.get('layer'), {map_view: this.map_view});
            this.map_view.obj.addLayer(this.layer_view.obj);
            this.create_obj();
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
            this.obj = new L.Control.Draw({
                edit: {featureGroup: this.layer_view.obj},
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
    WidgetManager.register_widget_view('LeafletDrawControlView', LeafletDrawControlView);


    var LeafletMapView = IPython.DOMWidgetView.extend({
        
        initialize: function (options) {
            LeafletMapView.__super__.initialize.apply(this, arguments);
            this.rendered = false;
        },
    
        // Layer management
        update_layers: function (old_list, new_list) {
            this.do_diff(
                old_list,
                new_list, 
                $.proxy(this.remove_layer_model, this),
                $.proxy(this.add_layer_model, this)
            );
        },
    
        remove_layer_model: function (child_model) {
            var child_view = this.child_views[child_model.id];
            this.obj.removeLayer(child_view.obj);
            this.delete_child_view(child_model);
        },
    
        add_layer_model: function (child_model) {
            var child_view = this.create_child_view(child_model, {map_view: this});
            this.obj.addLayer(child_view.obj);
        },

        // Control Management
        update_controls: function (old_list, new_list) {
            this.do_diff(
                old_list,
                new_list, 
                $.proxy(this.remove_control_model, this),
                $.proxy(this.add_control_model, this)
            );
        },

        remove_control_model: function (child_model) {
            var child_view = this.child_views[child_model.id];
            this.obj.removeControl(child_view.obj);
            this.delete_child_view(child_model);
        },

        add_control_model: function (child_model) {
            var child_view = this.create_child_view(child_model, {map_view: this});
            this.obj.addControl(child_view.obj);
        },

        // Rendering
        render: function () {
            this.$el.width(this.model.get('width')).height(this.model.get('height'));
            this.model.on('displayed', this.render_leaflet, this);
        },
    
        render_leaflet: function () {
            if (!this.rendered) {
                var that = this;
                this.create_obj();
                this.update_layers([], this.model.get('layers'));
                this.update_controls([], this.model.get('controls'));
                this.leaflet_events();
                this.model_events();
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
            this.model.on('change:layers', function(model, value, options) {
                that.update_layers(model.previous('layers'), value);
            });
            this.model.on('change:controls', function(model, value, options) {
                that.update_controls(model.previous('controls'), value);
            });
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
    WidgetManager.register_widget_view('LeafletMapView', LeafletMapView);


});