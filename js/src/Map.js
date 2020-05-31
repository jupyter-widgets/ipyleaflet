// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const widgets = require('@jupyter-widgets/base');
const L = require('./leaflet.js');
const utils = require('./utils.js');
const proj = require('./projections.js');

const DEFAULT_LOCATION = [0.0, 0.0];



export class LeafletMapStyleModel extends widgets.StyleModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: 'LeafletMapStyleModel',
      _model_module: 'jupyter-leaflet'
    };
  }
}

LeafletMapStyleModel.styleProperties = {
  cursor: {
    selector: '.leaflet-grab',
    attribute: 'cursor',
    default: 'grab'
  }
};

export class LeafletMapModel extends widgets.DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _view_name: 'LeafletMapView',
      _model_name: 'LeafletMapModel',
      _model_module: 'jupyter-leaflet',
      _view_module: 'jupyter-leaflet',
      center: DEFAULT_LOCATION,
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
      // inertia_threshold : int(?)
      // fade_animation : bool(?),
      // zoom_animation : bool(?),
      zoom_animation_threshold: 4,
      // marker_zoom_animation : bool(?),
      south: DEFAULT_LOCATION[0],
      north: DEFAULT_LOCATION[0],
      east: DEFAULT_LOCATION[1],
      west: DEFAULT_LOCATION[1],
      options: [],
      layers: [],
      controls: [],
      crs: {
        name: 'EPSG3857',
        custom: false
      },
      style: null,
      default_style: null,
      dragging_style: null,
      _dragging: false
    };
  }

  initialize(attributes, options) {
    super.initialize(attributes, options);
    this.set('window_url', window.location.href);
  }

  update_style() {
    var new_style;
    if (!this.get('_dragging')) {
      new_style = this.get('default_style');
    } else {
      new_style = this.get('dragging_style');
    }
    this.set('style', new_style);
  }

  update_bounds() {
    return widgets.resolvePromisesDict(this.views).then(views => {
      // default bounds if the projection is latlon
      var bounds = {
        north: -90,
        south: 90,
        east: -180,
        west: 180
      };
      Object.keys(views).reduce(function (bnds, key) {
        var obj = views[key].obj;
        if (obj) {
          var view_bounds = obj.getBounds();
          bnds.north = Math.max(bnds.north, view_bounds.getNorth());
          bnds.south = Math.min(bnds.south, view_bounds.getSouth());
          bnds.east = Math.max(bnds.east, view_bounds.getEast());
          bnds.west = Math.min(bnds.west, view_bounds.getWest());
        }
        return bnds;
      }, bounds);
      this.set('north', bounds.north);
      this.set('south', bounds.south);
      this.set('east', bounds.east);
      this.set('west', bounds.west);
    });
  }
}

LeafletMapModel.serializers = {
  ...widgets.DOMWidgetModel.serializers,
  layers: { deserialize: widgets.unpack_models },
  controls: { deserialize: widgets.unpack_models },
  style: { deserialize: widgets.unpack_models },
  default_style: { deserialize: widgets.unpack_models },
  dragging_style: { deserialize: widgets.unpack_models }
};

export class LeafletMapView extends utils.LeafletDOMWidgetView {
  initialize(options) {
    super.initialize(options);
    // The dirty flag is used to prevent sub-pixel center changes
    // computed by leaflet to be applied to the model.
    this.dirty = false;
  }

  remove_layer_view(child_view) {
    this.obj.removeLayer(child_view.obj);
    child_view.remove();
  }

  add_layer_model(child_model) {
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      this.obj.addLayer(view.obj);

      // Trigger the displayed event of the child view.
      this.displayed.then(() => {
        view.trigger('displayed', this);
      });

      return view;
    });
  }

  remove_control_view(child_view) {
    this.obj.removeControl(child_view.obj);
    child_view.remove();
  }

  add_control_model(child_model) {
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      this.obj.addControl(view.obj);

      // Trigger the displayed event of the child view.
      this.displayed.then(() => {
        view.trigger('displayed', this);
      });

      return view;
    });
  }

  render() {
    super.render();
    this.el.classList.add('jupyter-widgets');
    this.el.classList.add('leaflet-widgets');
    this.map_container = document.createElement('div');
    this.el.appendChild(this.map_container);
    if (this.get_options().interpolation == 'nearest') {
      this.map_container.classList.add('crisp-image');
    }
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );
    this.control_views = new widgets.ViewList(
      this.add_control_model,
      this.remove_control_view,
      this
    );
    this.displayed.then(this.render_leaflet.bind(this));
  }

  render_leaflet() {
    this.create_obj().then(() => {
      this.layer_views.update(this.model.get('layers'));
      this.control_views.update(this.model.get('controls'));
      this.leaflet_events();
      this.model_events();
      this.model.update_bounds().then(() => {
        this.touch();
      });

      return this;
    });
  }

  create_obj() {
    return this.layoutPromise.then(() => {
      var options = {
        ...this.get_options(),
        crs: proj.getProjection(this.model.get('crs')),
        zoomControl: false,
        attributionControl: false
      };
      this.obj = L.map(this.map_container, options);
    });
  }

  leaflet_events() {
    this.obj.on('moveend', e => {
      if (!this.dirty) {
        this.dirty = true;
        var c = e.target.getCenter();
        this.model.set('center', [c.lat, c.lng]);
        this.dirty = false;
      }
      this.model.update_bounds().then(() => {
        this.touch();
      });
      this.model.set('_dragging', false);
      this.model.update_style();
    });

    this.obj.on('movestart', () => {
      this.model.set('_dragging', true);
      this.model.update_style();
    });

    this.obj.on('zoomend', e => {
      if (!this.dirty) {
        this.dirty = true;
        var z = e.target.getZoom();
        this.model.set('zoom', z);
        this.dirty = false;
      }
      this.model.update_bounds().then(() => {
        this.touch();
      });
    });

    this.obj.on(
      'click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu preclick',
      event => {
        this.send({
          event: 'interaction',
          type: event.type,
          coordinates: [event.latlng.lat, event.latlng.lng],
          location: this.model.get('location')
        });
      }
    );

    this.obj.on('fullscreenchange', () => {
      this.model.set('fullscreen', this.obj.isFullscreen());
    });
  }

  model_events() {
    this.listenTo(this.model, 'msg:custom', this.handle_msg, this);
    this.listenTo(
      this.model,
      'change:layers',
      function () {
        this.layer_views.update(this.model.get('layers'));
      },
      this
    );
    this.listenTo(
      this.model,
      'change:controls',
      function () {
        this.control_views.update(this.model.get('controls'));
      },
      this
    );
    this.listenTo(
      this.model,
      'change:zoom',
      function () {
        if (!this.dirty) {
          this.dirty = true;
          // Using flyTo instead of setZoom to adjust for potential
          // sub-pixel error in leaflet object's center.
          //
          // Disabling animation on updates from the model because
          // animation triggers a `moveend` event in an animationFrame,
          // which causes the center to bounce despite of the dirty flag
          // which is set back to false synchronously.
          this.obj.flyTo(this.model.get('center'), this.model.get('zoom'), {
            animate: false
          });
          this.dirty = false;
        }
        this.model.update_bounds().then(() => {
          this.touch();
        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:center',
      function () {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.panTo(this.model.get('center'));
          this.dirty = false;
        }
        this.model.update_bounds().then(() => {
          this.touch();
        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:dragging_style',
      function () {
        this.model.update_style();
      },
      this
    );
    this.listenTo(
      this.model,
      'change:default_style',
      function () {
        this.model.update_style();
      },
      this
    );
    this.listenTo(
      this.model,
      'change:fullscreen',
      function () {
        var fullscreen = this.model.get('fullscreen');
        if (this.obj.isFullscreen() !== fullscreen) {
          this.obj.toggleFullscreen();
        }
      },
      this
    );
  }

  handle_msg(content) {
    switch (content.method) {
      case 'foo':
        break;
    }
  }

  processPhosphorMessage(msg) {
    super.processPhosphorMessage(msg);
    switch (msg.type) {
      case 'resize':
        // We set the dirty flag to true to prevent the sub-pixel error
        // on the new center to be reflected on the model.
        this.dirty = true;
        // On the pan option:
        // `pan=true`  causes the center to be unchanged upon resize (up
        // to sub-pixel differences)
        // `pan=false` corresponds to having to top-left corner
        // unchanged.
        this.obj.invalidateSize({
          animate: false,
          pan: true
        });
        this.dirty = false;
        break;
      case 'after-show':
        this.dirty = true;
        this.obj.invalidateSize({
          animate: false,
          pan: true
        });
        this.dirty = false;
        break;
    }
  }
}
