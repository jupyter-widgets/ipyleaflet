var widgets = require('@jupyter-widgets/base');
var _ = require('underscore');
var L = require('./leaflet.js');
var utils = require('./utils.js');
var LeafletWidgetView = utils.LeafletWidgetView;
var LeafletDOMWidgetView = utils.LeafletDOMWidgetView;
var def_loc = [0.0, 0.0];

var LeafletMapModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
        _view_name : "LeafletMapView",
        _model_name : "LeafletMapModel",
        _model_module : "jupyter-leaflet",
        _view_module : "jupyter-leaflet",

        center : def_loc,
        zoom_start : 12,
        zoom : 12,
        max_zoom : 18,
        min_zoom : 1,
        basemap : {
            'url' : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'max_zoom' : 19,
            'attribution': '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
            'name' : 'OpenStreetMap.Mapnik'
        },
        dragging : true,
        touch_zoom : true,
        scroll_wheel_zoom : false,
        double_click_zoom : true,
        box_zoom : true,
        tap : true,
        tap_tolerance : 15,
        world_copy_jump : false,
        close_popup_on_click : true,
        bounce_at_zoom_limits : true,
        keyboard : true,
        keyboard_pan_offset : 80,
        keyboard_zoom_offset : 1,
        inertia : true,
        inertia_deceleration : 3000,
        inertia_max_speed : 1500,
        // inertia_threshold : int(?)
        zoom_control : true,
        attribution_control : true,
        // fade_animation : bool(?),
        // zoom_animation : bool(?),
        zoom_animation_threshold : 4,
        // marker_zoom_animation : bool(?),
        south : def_loc[0],
        north : def_loc[0],
        east : def_loc[1],
        west : def_loc[1],
        options : [],
        layers : [],
        controls : []
    }),

    update_bounds: function() {
        var that = this;
        return widgets.resolvePromisesDict(this.views).then(function(views) {
            var bounds = {
                north: -90,
                south: 90,
                east: -180,
                west: 180
            };
            Object.keys(views).reduce(function (bnds, key) {
                var view_bounds = views[key].obj.getBounds();
                bnds.north = Math.max(bnds.north, view_bounds.getNorth());
                bnds.south = Math.min(bnds.south, view_bounds.getSouth());
                bnds.east = Math.max(bnds.east, view_bounds.getEast());
                bnds.west = Math.min(bnds.west, view_bounds.getWest());
                return bnds;
            }, bounds);
            that.set('north', bounds.north);
            that.set('south', bounds.south);
            that.set('east', bounds.east);
            that.set('west', bounds.west);
        });
    }
}, {
    serializers: _.extend({
        layers : { deserialize: widgets.unpack_models },
        controls : { deserialize: widgets.unpack_models }
    }, widgets.DOMWidgetModel.serializers)
});

var LeafletMapView = utils.LeafletDOMWidgetView.extend({
    initialize: function (options) {
        LeafletMapView.__super__.initialize.apply(this, arguments);
        // The dirty flag is used to prevent sub-pixel center changes
        // computed by leaflet to be applied to the model.
        this.dirty = false;
    },

    remove_layer_view: function (child_view) {
        this.obj.removeLayer(child_view.obj);
        child_view.remove();
    },

    add_layer_model: function (child_model) {
        var that = this;
        return this.create_child_view(child_model, {
            map_view: this
        }).then(function (view) {
            that.obj.addLayer(view.obj);

            // Trigger the displayed event of the child view.
            that.displayed.then(function() {
                view.trigger('displayed', that);
            });

            return view;
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
        }).then(function (view) {
            console.log(view.obj)
            that.obj.addControl(view.obj);

            // Trigger the displayed event of the child view.
            that.displayed.then(function() {
                view.trigger('displayed', that);
            });

            return view;
        });
    },

    render: function () {
        LeafletMapView.__super__.render.apply(this);
        this.el.classList.add('jupyter-widgets');
        if (this.get_options().interpolation == 'nearest') {
            this.el.classList.add('crisp-image');
        }
        this.layer_views = new widgets.ViewList(this.add_layer_model, this.remove_layer_view, this);
        this.control_views = new widgets.ViewList(this.add_control_model, this.remove_control_view, this);
        this.displayed.then(_.bind(this.render_leaflet, this));
    },

    render_leaflet: function () {
        var that = this;
        this.create_obj().then(function() {
            that.layer_views.update(that.model.get('layers'));
            that.control_views.update(that.model.get('controls'));
            that.leaflet_events();
            that.model_events();
            that.model.update_bounds().then(function() {
                that.touch();
            });
            return that;
        });
    },

    create_obj: function () {
        var that = this;
        return this.layoutPromise.then(function(views) {
            that.obj = L.map(that.el, that.get_options(), {fullscreenControl: true,});
        });
    },

    leaflet_events: function () {
        var that = this;
        this.obj.on('moveend', function (e) {
            if (!that.dirty) {
                that.dirty = true;
                var c = e.target.getCenter();
                that.model.set('center', [c.lat, c.lng]);
                that.dirty = false;
            }
            that.model.update_bounds().then(function() {
                that.touch();
            });
        });
        this.obj.on('zoomend', function (e) {
            if (!that.dirty) {
                that.dirty = true;
                var z = e.target.getZoom();
                that.model.set('zoom', z);
                that.dirty = false;
            }
            that.model.update_bounds().then(function() {
                that.touch();
            });
        });
        this.obj.on('click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu preclick', function(event) {
            that.send({
                event: 'interaction',
                type: event.type,
                coordinates: [event.latlng.lat, event.latlng.lng],
                location: that.model.get('location')
            });
        });
    },
    model_events: function () {
        var that = this;
        this.listenTo(this.model, 'msg:custom', this.handle_msg, this);
        this.listenTo(this.model, 'change:layers', function () {
            this.layer_views.update(this.model.get('layers'));
        }, this);
        this.listenTo(this.model, 'change:controls', function () {
            this.control_views.update(this.model.get('controls'));
        }, this);
        this.listenTo(this.model, 'change:zoom', function () {
            if (!this.dirty) {
                this.dirty = true;
                // Using flyTo instead of setZoom to adjust for potential
                // sub-pixel error in leaflet object's center.
                //
                // Disabling animation on updates from the model because
                // animation triggers a `moveend` event in an animationFrame,
                // which causes the center to bounce despite of the dirty flag
                // which is set back to false synchronously.
                this.obj.flyTo(this.model.get('center'),
                               this.model.get('zoom'), {
                                   animate: false
                               });
                this.dirty = false;
            }
            var that = this;
            this.model.update_bounds().then(function() {
                that.touch();
            });
        }, this);
        this.listenTo(this.model, 'change:center', function () {
            if (!this.dirty) {
                this.dirty = true;
                this.obj.panTo(this.model.get('center'));
                this.dirty = false;
            }
            var that = this;
            this.model.update_bounds().then(function() {
                that.touch();
            });
        }, this);
    },

    handle_msg: function (content) {
        switch(content.method) {
            case 'foo':
                break;
        }
    },

    processPhosphorMessage: function(msg) {
        LeafletMapView.__super__.processPhosphorMessage.apply(this, arguments);
        switch (msg.type) {
            case 'resize':
                // We set the dirty flag to true to prevent the sub-pixel error
                // on the new center to be reflected on the model.
                this.dirty = true
                // On the pan option:
                // `pan=true`  causes the center to be unchanged upon resize (up
                // to sub-pixel differences)
                // `pan=false` corresponds to having to top-left corner
                // unchanged.
                this.obj.invalidateSize({
                    animate: false,
                    pan: true
                });
                this.dirty = false
                break;
            case 'after-show':
                this.dirty = true
                this.obj.invalidateSize({
                    animate: false,
                    pan: true
                });
                this.dirty = false
                break;
        }
    },
});

module.exports = {
  LeafletMapView : LeafletMapView,
  LeafletMapModel : LeafletMapModel,
};
