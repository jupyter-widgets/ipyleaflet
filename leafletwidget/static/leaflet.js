

require.config({paths: {leaflet: "http://cdn.leafletjs.com/leaflet-0.7.2/leaflet"}});

require(["widgets/js/widget", "leaflet"], function(WidgetManager, leaflet) {

    function camel_case(input) {
        // Convert from foo_bar to fooBar 
        return input.toLowerCase().replace(/_(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }
    
    var LeafletLayerView = IPython.WidgetView.extend({
        
        initialize: function (parameters) {
            console.log('Layer.initialize');
            LeafletLayerView.__super__.initialize.apply(this, arguments);
            // Remove this line after testing...
            this.model.on('displayed', this.test_display, this);
            // this.map_view = this.options.map_view;
        },
    
        // Remove this method after testing...
        test_display: function () {
            console.log('displayed!!!');
        },
    
        render: function () {
            console.log('options', this.get_options());
            this.create_obj();
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
            this.obj = leaflet.marker(
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
            this.obj = leaflet.tileLayer(
                this.model.get('url'),
                this.get_options()
            );
        },
        
    });
    WidgetManager.register_widget_view('LeafletTileLayerView', LeafletTileLayerView);
    
    
    var LeafletImageOverlayView = LeafletRasterLayerView.extend({
        
        create_obj: function () {
            this.obj = leaflet.imageOverlay(
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
            this.obj = leaflet.polyline(
                this.model.get('locations'),
                this.get_options()
            );
        },
        
    });
    WidgetManager.register_widget_view('LeafletPolylineView', LeafletPolylineView);
    
    
    var LeafletPolygonView = LeafletPolylineView.extend({
    
        create_obj: function () {
            console.log('Polygon.create_obj', this.model.get('locations'));
            this.obj = leaflet.polygon(this.model.get('locations'), this.get_options());
        },
    
    });
    WidgetManager.register_widget_view('LeafletPolygonView', LeafletPolygonView);
    
    
    var LeafletRectangleView = LeafletPolygonView.extend({
        
        create_obj: function () {
            this.obj = leaflet.rectangle(
                this.model.get('bounds'),
                this.get_options()
            );
        },

    });
    WidgetManager.register_widget_view('LeafletRectangleView', LeafletRectangleView);
    
    
    var LeafletCircleView = LeafletPathView.extend({
        
        create_obj: function () {
            console.log('Circle.create_obj', this.model.get('location'));
            this.obj = leaflet.circle(
                this.model.get('location'), this.model.get('radius'),
                this.get_options()
            );
        },
    
    });
    WidgetManager.register_widget_view('LeafletCircleView', LeafletCircleView);
    
    
    var LeafletCircleMarkerView = LeafletCircleView.extend({
    
        create_obj: function () {
            this.obj = leaflet.circleMarker(
                this.model.get('location'), this.model.get('radius'),
                this.get_options()
            );
        },
    
    });
    WidgetManager.register_widget_view('LeafletCircleMarkerView', LeafletCircleMarkerView);
    
    
    // LayerGroup
    var LeafletLayerGroupView = LeafletLayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletLayerGroupView', LeafletLayerGroupView);
    
    
    var LeafletFeatureGroupView = LeafletLayerGroupView.extend({
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
                    console.log(feature.properties.style);
                    return feature.properties.style;
                } 
            }
            this.obj = leaflet.geoJson(this.model.get('data'), {style: style});
        },
    });
    WidgetManager.register_widget_view('LeafletGeoJSONView', LeafletGeoJSONView);


    var LeafletMultiPolygonView = LeafletFeatureGroupView.extend({
    });
    WidgetManager.register_widget_view('LeafletMultiPolygonView', LeafletMultiPolygonView);
    
    
    var LeafletMapView = IPython.DOMWidgetView.extend({
        
        initialize: function (options) {
            LeafletMapView.__super__.initialize.apply(this, arguments);
        },
    
        // Layer management
        update_layers: function (old_list, new_list) {
            this.do_diff(
                old_list,
                new_list, 
                $.proxy(this.remove_child_model, this),
                $.proxy(this.add_child_model, this)
            );
        },
    
        remove_child_model: function (child_model) {
            var child_view = this.child_views[child_model.id];
            this.obj.removeLayer(child_view.obj);
            this.delete_child_view(child_model);
        },
    
        add_child_model: function (child_model) {
            var child_view = this.create_child_view(child_model);
            this.obj.addLayer(child_view.obj);
        },
    
        // Rendering
        render: function () {
            this.$el.width(this.model.get('width')).height(this.model.get('height'));
            this.model.on('displayed', this.render_leaflet, this);
        },
    
        render_leaflet: function () {
            var that = this;
            console.log('options', this.get_options());
            this.create_obj();
            this.update_layers([], this.model.get('layers'));
            this.leaflet_events();
            this.model_events();
            this.update_bounds();
        },
    
        create_obj: function () {
            this.obj = leaflet.map(this.$el.get(0), this.get_options());
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