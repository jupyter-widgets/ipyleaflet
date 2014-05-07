

require.config({paths: {leaflet: "http://cdn.leafletjs.com/leaflet-0.7.2/leaflet"}});

require(["widgets/js/widget", "leaflet"], function(WidgetManager, leaflet) {
    
    var LeafletWidgetView = IPython.DOMWidgetView.extend({
        
        initialize: function (options) {
            LeafletWidgetView.__super__.initialize.apply(this, arguments);
        },

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
            this.leaflet_events();
            this.model_events();
            this.model.on('msg:custom', this.handle_msg, this);
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
            var that = this;
            var b = that.map.getBounds();
            var o = {north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest()};
            that.send({method:'update_bounds', data:o});
        },

        model_events: function () {
            var that = this;
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
                case 'add_polygon':
                    this.add_polygon(content.locations);
                    break;
                case 'add_circle_marker':
                    this.add_circle_marker(content.location, content.radius);
                    break;
                case 'add_geojson':
                    this.add_geojson(content.data, content.style);
                    break;
            }
        },

        add_polygon: function (locations) {
            leaflet.polygon(locations).addTo(this.map);
        },
        
        add_circle_marker: function (location, radius) {
            leaflet.circleMarker(location, {radius:radius}).addTo(this.map);
        },

        add_geojson: function (data, style) {
            leaflet.geoJson(data, {style: style}).addTo(this.map);
        },
        
    });
    
    WidgetManager.register_widget_view('LeafletMapView', LeafletWidgetView);
});