

require.config({paths: {leaflet: "http://cdn.leafletjs.com/leaflet-0.7.2/leaflet"}});

require(["widgets/js/widget", "leaflet"], function(WidgetManager, leaflet) {

    var LeafletLayerView = IPython.WidgetView.extend({
        
        initialize: function (parameters) {
            console.log('Layer.initialize');
            LeafletLayerView.__super__.initialize.apply(this, arguments);
            this.map_view = this.options.map_view;
        },

        render: function () {
            this.create_obj();
        }
    });
    WidgetManager.register_widget_view('LeafletLayerView', LeafletLayerView);


    // UILayer
    var LeafletUILayerView = LeafletLayerView.extend({
    });
    WidgetManager.register_widget_view('LeafletUILayerView', LeafletUILayerView);


    var LeafletMarkerView = LeafletUILayerView.extend({
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
    });
    WidgetManager.register_widget_view('LeafletTileLayerView', LeafletTileLayerView);


    var LeafletImageOverlayView = LeafletRasterLayerView.extend({
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
    });
    WidgetManager.register_widget_view('LeafletPolylineView', LeafletPolylineView);


    var LeafletPolygonView = LeafletPolylineView.extend({

        create_obj: function () {
            console.log('Polygon.create_obj', this.model.get('locations'));
            this.obj = leaflet.polygon(this.model.get('locations'));
        },

    });
    WidgetManager.register_widget_view('LeafletPolygonView', LeafletPolygonView);


    var LeafletRectangleView = LeafletPolygonView.extend({
    });
    WidgetManager.register_widget_view('LeafletRectangleView', LeafletRectangleView);


    var LeafletCircleView = LeafletPathView.extend({
        
        create_obj: function () {
            console.log('Circle.create_obj', this.model.get('location'));
            this.obj = leaflet.circle(this.model.get('location'), this.model.get('radius'));
        },

    });
    WidgetManager.register_widget_view('LeafletCircleView', LeafletCircleView);


    var LeafletCircleMarkerView = LeafletCircleView.extend({

        create_obj: function () {
            console.log('CircleMarker.create_obj', this.model.get('location'));
            this.obj = leaflet.circleMarker(this.model.get('location'), this.model.get('radius'));
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
            console.log('CircleMarker.create_obj', this.model.get('location'));
            this.obj = leaflet.geoJson(this.model.get('data'));
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
            this.map.removeLayer(child_view.obj);
            this.delete_child_view(child_model);
        },

        add_child_model: function (child_model) {
            var child_view = this.create_child_view(child_model);
            console.log('Map.add_child_view', child_model);
            this.map.addLayer(child_view.obj);
        },

        // Rendering
        render: function () {
            this.$el.width(this.model.get('width')).height(this.model.get('height'));
            this.model.on('displayed', this.render_leaflet, this);
        },

        render_leaflet: function () {
            var that = this;
            this.map = leaflet.map(this.$el.get(0));
            this.map.setView(this.model.get('location'), this.model.get('zoom_start'));
            leaflet.tileLayer(this.model.get('tiles_url'), {
                attribution: this.model.get('tiles_attr'),
                maxZoom: this.model.get('max_zoom'),
                minZoom: this.model.get('min_zoom'),
            }).addTo(this.map);
            this.update_layers([], this.model.get('layers'));
            this.leaflet_events();
            this.model_events();
            this.update_bounds();
        },

        leaflet_events: function () {
            var that = this;
            this.map.on('moveend', function (e) {
                var c = e.target.getCenter();
                that.model.set('location', [c.lat, c.lng]);
                that.touch();
                that.update_bounds();
            });
            this.map.on('zoomend', function (e) {
                var z = e.target.getZoom();
                that.model.set('zoom', z);
                that.touch();
                that.update_bounds();
            });
        },

        update_bounds: function () {
            var b = this.map.getBounds();
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
                that.map.setZoom(that.model.get('zoom'));
                that.update_bounds();
            });
            this.model.on('change:location', function () {
                that.map.panTo(that.model.get('location'));
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