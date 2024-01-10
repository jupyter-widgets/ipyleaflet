// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { DOMWidgetModel, StyleModel, ViewList, resolvePromisesDict, unpack_models, } from '@jupyter-widgets/base';
import L from './leaflet';
import { getProjection } from './projections';
import { LeafletDOMWidgetView } from './utils';
const DEFAULT_LOCATION = [0.0, 0.0];
export class LeafletMapStyleModel extends StyleModel {
    defaults() {
        return {
            ...super.defaults(),
            _model_name: 'LeafletMapStyleModel',
            _model_module: 'jupyter-leaflet',
        };
    }
}
LeafletMapStyleModel.styleProperties = {
    cursor: {
        selector: '.leaflet-grab',
        attribute: 'cursor',
        default: 'grab',
    },
};
export class LeafletMapModel extends DOMWidgetModel {
    defaults() {
        return {
            ...super.defaults(),
            _view_name: 'LeafletMapView',
            _model_name: 'LeafletMapModel',
            _model_module: 'jupyter-leaflet',
            _view_module: 'jupyter-leaflet',
            center: DEFAULT_LOCATION,
            zoom: 12,
            max_zoom: null,
            min_zoom: null,
            dragging: true,
            touch_zoom: true,
            zoom_delta: 1,
            zoom_snap: 1,
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
            bottom: 0,
            top: 9007199254740991,
            right: 0,
            left: 9007199254740991,
            options: [],
            panes: {},
            layers: [],
            controls: [],
            crs: {
                name: 'EPSG3857',
                custom: false,
            },
            style: null,
            default_style: null,
            dragging_style: null,
        };
    }
    initialize(attributes, options) {
        super.initialize(attributes, options);
        this.set('window_url', window.location.href);
        this._dragging = false;
    }
    update_style() {
        let new_style;
        if (!this._dragging) {
            new_style = this.get('default_style');
        }
        else {
            new_style = this.get('dragging_style');
        }
        this.set('style', new_style);
    }
    async update_bounds() {
        const views = await resolvePromisesDict(this.views);
        // default bounds if the projection is latlng
        let bounds = {
            north: -90,
            south: 90,
            east: -Infinity,
            west: Infinity,
        };
        let pixel_bounds = {
            top: 9007199254740991,
            bottom: 0,
            right: 0,
            left: 9007199254740991,
        };
        [bounds, pixel_bounds] = Object.keys(views).reduce(function (bnds_pixbnds, key) {
            const bnds = bnds_pixbnds[0];
            const pixbnds = bnds_pixbnds[1];
            const currentView = views[key];
            if (currentView?.obj) {
                const view_bounds = currentView.obj.getBounds();
                bnds.north = Math.max(bnds.north, view_bounds.getNorth());
                bnds.south = Math.min(bnds.south, view_bounds.getSouth());
                bnds.east = Math.max(bnds.east, view_bounds.getEast());
                bnds.west = Math.min(bnds.west, view_bounds.getWest());
                const view_pixel_bounds = currentView.obj.getPixelBounds();
                const top_left = view_pixel_bounds.getTopLeft();
                const bottom_right = view_pixel_bounds.getBottomRight();
                pixbnds.top = Math.min(pixbnds.top, top_left.y);
                pixbnds.bottom = Math.max(pixbnds.bottom, bottom_right.y);
                pixbnds.right = Math.max(pixbnds.right, bottom_right.x);
                pixbnds.left = Math.min(pixbnds.left, top_left.x);
            }
            return [bnds, pixbnds];
        }, [bounds, pixel_bounds]);
        this.set('north', bounds.north);
        this.set('south', bounds.south);
        this.set('east', bounds.east);
        this.set('west', bounds.west);
        this.set('top', pixel_bounds.top);
        this.set('bottom', pixel_bounds.bottom);
        this.set('right', pixel_bounds.right);
        this.set('left', pixel_bounds.left);
    }
}
LeafletMapModel.serializers = {
    ...DOMWidgetModel.serializers,
    layers: { deserialize: unpack_models },
    controls: { deserialize: unpack_models },
    style: { deserialize: unpack_models },
    default_style: { deserialize: unpack_models },
    dragging_style: { deserialize: unpack_models },
};
export class LeafletMapView extends LeafletDOMWidgetView {
    initialize(options) {
        super.initialize(options);
        // The dirty flag is used to prevent sub-pixel center changes
        // computed by leaflet to be applied to the model.
        this.dirty = false;
    }
    create_panes() {
        const panes = this.model.get('panes');
        for (const name in panes) {
            const pane = this.obj.createPane(name);
            const styles = panes[name];
            for (const key in styles) {
                pane.style[key] = styles[key];
            }
        }
    }
    remove_layer_view(child_view) {
        this.obj.removeLayer(child_view.obj);
        child_view.remove();
    }
    async add_layer_model(child_model) {
        const view = await this.create_child_view(child_model, {
            map_view: this,
        });
        this.obj.addLayer(view.obj);
        this.displayed.then(() => {
            view.trigger('displayed', this);
        });
        return view;
    }
    remove_control_view(child_view) {
        this.obj.removeControl(child_view.obj);
        child_view.remove();
    }
    async add_control_model(child_model) {
        const view = await this.create_child_view(child_model, {
            map_view: this,
        });
        this.obj.addControl(view.obj);
        // Trigger the displayed event of the child view.
        this.displayed.then(() => {
            view.trigger('displayed', this);
        });
        return view;
    }
    render() {
        super.render();
        this.el.classList.add('jupyter-widgets');
        this.el.classList.add('leaflet-widgets');
        this.map_container = document.createElement('div');
        this.map_child = this.el.appendChild(this.map_container);
        if (this.get_options().interpolation == 'nearest') {
            this.map_container.classList.add('crisp-image');
        }
        this.layer_views = new ViewList(this.add_layer_model, this.remove_layer_view, this);
        this.control_views = new ViewList(this.add_control_model, this.remove_control_view, this);
        this.displayed.then(this.render_leaflet.bind(this));
    }
    render_leaflet() {
        this.create_obj().then(() => {
            this.create_panes();
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
    async create_obj() {
        return this.layoutPromise.then(() => {
            const options = {
                ...this.get_options(),
                crs: getProjection(this.model.get('crs')),
                zoomControl: false,
                attributionControl: false,
            };
            this.obj = L.map(this.map_container, options);
        });
    }
    rerender() {
        this.obj.remove();
        //@ts-ignore
        delete this.obj;
        this.el.removeChild(this.map_child);
        this.render();
    }
    leaflet_events() {
        this.obj.on('moveend', (e) => {
            if (!this.dirty) {
                this.dirty = true;
                const c = e.target.getCenter();
                this.model.set('center', [c.lat, c.lng]);
                this.dirty = false;
            }
            this.model.update_bounds().then(() => {
                this.touch();
            });
            this.model._dragging = false;
            this.model.update_style();
        });
        this.obj.on('movestart', () => {
            this.model._dragging = true;
            this.model.update_style();
        });
        this.obj.on('zoomend', (e) => {
            if (!this.dirty) {
                this.dirty = true;
                const z = e.target.getZoom();
                this.model.set('zoom', z);
                this.dirty = false;
            }
            this.model.update_bounds().then(() => {
                this.touch();
            });
        });
        this.obj.on('click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu preclick', (event) => {
            this.send({
                event: 'interaction',
                type: event.type,
                coordinates: [event.latlng.lat, event.latlng.lng],
                location: this.model.get('location'),
            });
        });
        this.obj.on('fullscreenchange', () => {
            this.model.set('fullscreen', this.obj.isFullscreen());
        });
    }
    model_events() {
        let key;
        let o = this.model.get('options');
        for (let i = 0; i < o.length; i++) {
            key = o[i];
            this.listenTo(this.model, 'change:' + key, () => {
                L.setOptions(this.obj, this.get_options());
            });
        }
        this.listenTo(this.model, 'change:panes', this.rerender);
        this.listenTo(this.model, 'change:dragging', () => {
            if (this.model.get('dragging')) {
                this.obj.dragging.enable();
            }
            else {
                this.obj.dragging.disable();
            }
        });
        this.listenTo(this.model, 'change:layers', () => {
            this.layer_views.update(this.model.get('layers'));
        });
        this.listenTo(this.model, 'change:controls', () => {
            this.control_views.update(this.model.get('controls'));
        });
        this.listenTo(this.model, 'change:zoom', () => {
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
                    animate: false,
                });
                this.dirty = false;
            }
            this.model.update_bounds().then(() => {
                this.touch();
            });
        });
        this.listenTo(this.model, 'change:center', () => {
            if (!this.dirty) {
                this.dirty = true;
                this.obj.panTo(this.model.get('center'));
                this.dirty = false;
            }
            this.model.update_bounds().then(() => {
                this.touch();
            });
        });
        this.listenTo(this.model, 'change:dragging_style', () => {
            this.model.update_style();
        });
        this.listenTo(this.model, 'change:default_style', () => {
            this.model.update_style();
        });
        this.listenTo(this.model, 'change:fullscreen', () => {
            const fullscreen = this.model.get('fullscreen');
            if (this.obj.isFullscreen() !== fullscreen) {
                this.obj.toggleFullscreen();
            }
        });
    }
    processPhosphorMessage(msg) {
        //@ts-ignore This is for backward compatibility with Jupyterlab 3
        this._processLuminoMessage(msg, super.processPhosphorMessage);
    }
    processLuminoMessage(msg) {
        this._processLuminoMessage(msg, super.processLuminoMessage);
    }
    _processLuminoMessage(msg, _super) {
        _super.call(this, msg);
        if (!this.obj)
            return;
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
                    pan: true,
                });
                this.dirty = false;
                break;
            case 'after-show':
                this.dirty = true;
                // If we are in a jupyter-widget tab, we get an after-show before
                // this.displayed is resolved. In this case, obj is not created yet.
                this.obj.invalidateSize({
                    animate: false,
                    pan: true,
                });
                this.dirty = false;
                break;
        }
    }
}
//# sourceMappingURL=Map.js.map