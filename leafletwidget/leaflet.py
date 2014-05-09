from __future__ import print_function

import json

from IPython.utils.traitlets import (
    Float, Unicode, Int, Tuple, List, Instance, Bool, Dict
)
from IPython.html import widgets
from IPython.utils.traitlets import link

# def_loc = [32.3226932,-90.9019257]
def_loc = [0.0, 0.0]

class LayerException(Exception):
    pass


class Layer(widgets.Widget):
    _view_name = Unicode('LeafletLayerView', sync=True)
    bottom = Bool(False, sync=True)

    options = List(trait=Unicode, allow_none=False, sync=True)
    def _options_default(self):
        return [name for name in self.traits(o=True)]

    _map = None

    visible = Bool(False)
    def _visible_changed(self, name, was_visible, will_visible):
        if self._map is None:
            # If Map.add_layer has never been called raise
            raise LayerException('Map.add_layer() must be called first')
        else:
            # Map.add_layer() was called
            if (not was_visible) and will_visible:
                # Only add if we aren't already in self._map.layers
                if self.model_id not in self._map.layer_ids:
                    self._map.add_layer(self)
            # Map.remove_layer() was called
            elif was_visible and (not will_visible):
                # Only remove if we are in self._map.layers
                if self.model_id in self._map.layer_ids:
                    self._map.remove_layer(self)
    
    interact_widgets = Dict({
        'visible': (widgets.CheckboxWidget, {}, 'value')
    }, allow_none=False)

    def interact(self, name):
        """Automatically build and link a widget for the attribute name."""
        if name in self.interact_widgets:
            wdata = self.interact_widgets[name]
            klass = wdata[0]
            kwargs = wdata[1]
            widget_attr = wdata[2]
            kwargs[widget_attr] = getattr(self, name)
            w = klass(**kwargs)
            link((w,widget_attr),(self,name))
            return w


class UILayer(Layer):
    _view_name = Unicode('LeafletUILayerView', sync=True)


class Marker(UILayer):
    _view_name = Unicode('LeafletMarkerView', sync=True)
    # read/write
    location = List(def_loc, sync=True)
    z_index_offset = Int(0, sync=True, o=True)
    opacity = Float(1.0, sync=True, o=True)
    # write
    clickable = Bool(True, sync=True, o=True)
    draggable = Bool(False, sync=True, o=True)
    keyboard = Bool(True, sync=True, o=True)
    title = Unicode('', sync=True, o=True)
    alt = Unicode('', sync=True, o=True)
    rise_on_hover = Bool(False, sync=True, o=True)
    rise_offset = Int(250, sync=True, o=True)


class Popup(UILayer):
    _view_name = Unicode('LeafletPopupView', sync=True)


class RasterLayer(Layer):
    _view_name = Unicode('LeafletRasterLayerView', sync=True)


class TileLayer(RasterLayer):
    _view_name = Unicode('LeafletTileLayerView', sync=True)
    bottom = Bool(True, sync=True)
    url = Unicode('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', sync=True)
    min_zoom = Int(0, sync=True, o=True)
    max_zoom = Int(18, sync=True, o=True)
    tile_size = Int(256, sync=True, o=True)
    attribution = Unicode('Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', sync=True, o=True)
    opacity = Float(1.0, sync=True, o=True)
    detect_retina = Bool(False, sync=True, o=True)


class ImageOverlay(RasterLayer):
    _view_name = Unicode('LeafletImageOverlayView', sync=True)
    url = Unicode('', sync=True)
    bounds = List([def_loc, def_loc], sync=True, help="SW and NE corners of the image")
    opacity = Float(1.0, sync=True, o=True)
    attribution = Unicode('', sync=True, o=True)


class VectorLayer(Layer):
    _view_name = Unicode('LeafletVectorLayerView', sync=True)


class Path(VectorLayer):
    _view_name = Unicode('LeafletPathView', sync=True)
    stroke = Bool(True, sync=True, o=True)
    color = Unicode('#03F', sync=True, o=True)
    weight = Int(5, sync=True, o=True)
    opacity = Float(0.5, sync=True, o=True)
    fill = Bool(True, sync=True, o=True)
    fill_color = Unicode('#03F', sync=True, o=True)
    fill_opacity = Float(0.2, sync=True, o=True)
    dash_array = Unicode('', sync=True, o=True)
    line_cap = Unicode('', sync=True, o=True)
    line_join = Unicode('', sync=True, o=True)
    clickable = Bool(True, sync=True, o=True)
    pointer_events = Unicode('', sync=True, o=True)
    class_name = Unicode('', sync=True, o=True)


class Polyline(Path):
    _view_name = Unicode('LeafletPolylineView', sync=True)
    locations = List([], sync=True)
    smooth_factor = Float(1.0, sync=True, o=True)
    no_clip = Bool(False, sync=True, o=True)


class Polygon(Polyline):
    _view_name = Unicode('LeafletPolygonView', sync=True)


class Rectangle(Polygon):
    _view_name = Unicode('LeafletRectangleView', sync=True)
    bounds = List([], sync=True, help="list of SW and NE location tuples")


class Circle(Path):
    _view_name = Unicode('LeafletCircleView', sync=True)
    location = List(def_loc, sync=True)
    radius = Int(1000, sync=True, help="radius of circle in meters")


class CircleMarker(Circle):
    _view_name = Unicode('LeafletCircleMarkerView', sync=True)
    radius = Int(10, sync=True, help="radius of circle in pixels")


class LayerGroup(Layer):
    _view_name = Unicode('LeafletLayerGroupView', sync=True)
    layers = List(Instance(Layer), sync=True)


class FeatureGroup(Layer):
    _view_name = Unicode('LeafletFeatureGroupView', sync=True)


class GeoJSON(FeatureGroup):
    _view_name = Unicode('LeafletGeoJSONView', sync=True)
    data = Dict({}, sync=True)
    style = Dict({}, sync=True)


class MultiPolyline(FeatureGroup):
    _view_name = Unicode('LeafletMultiPolylineView', sync=True)


class MultiPolygon(FeatureGroup):
    _view_name = Unicode('LeafletMultiPolygonView', sync=True)


class ControlException(Exception):
    pass


class Control(widgets.Widget):
    _view_name = Unicode('LeafletControlView', sync=True)

    options = List(trait=Unicode, allow_none=False, sync=True)
    def _options_default(self):
        return [name for name in self.traits(o=True)]

    _map = None

    visible = Bool(False)
    def _visible_changed(self, name, was_visible, will_visible):
        if self._map is None:
            # If Map.add_control has never been called raise
            raise ControlException('Map.add_control() must be called first')
        else:
            # Map.add_control() was called
            if (not was_visible) and will_visible:
                # Only add if we aren't already in self._map.controls
                if self.model_id not in self._map.control_ids:
                    self._map.add_control(self)
            # Map.remove_controls() was called
            elif was_visible and (not will_visible):
                # Only remove if we are in self._map.controls
                if self.model_id in self._map.control_ids:
                    self._map.remove_control(self)


class DrawControl(Control):
    _view_name = Unicode('LeafletDrawControlView', sync=True)
    layer = Instance(FeatureGroup, sync=True)
    def _layer_default(self):
        return FeatureGroup()
    # Enable each of the following drawing by giving them a non empty dict of options
    # You can add Leaflet style options in the shapeOptions sub-dict
    # See https://github.com/Leaflet/Leaflet.draw#polylineoptions
    polyline = Dict({'shapeOptions':{}}, sync=True)
    # See https://github.com/Leaflet/Leaflet.draw#polygonoptions
    polygon = Dict({'shapeOptions':{}}, sync=True)
    # Leave empty to disable these
    circle = Dict({}, sync=True)
    rectangle = Dict({}, sync=True)
    marker = Dict({}, sync=True)

    _draw_callbacks = Instance(widgets.CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(DrawControl, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content):
        if content.get('event', '').startswith('draw'):
            event, action = content.get('event').split(':')
            self.last_draw = content.get('geo_json')
            self.last_action = action
            self._draw_callbacks(self, action=action, geo_json=self.last_draw)

    def on_draw(self, callback, remove=False):
        self._draw_callbacks.register_callback(callback, remove=remove)

class Map(widgets.DOMWidget):

    _view_name = Unicode('LeafletMapView', sync=True)
    
    # Map options
    center = List(def_loc, sync=True, o=True)
    width = Unicode('600px', sync=True, o=True)
    height = Unicode('400px', sync=True, o=True)
    zoom_start = Int(12, sync=True, o=True)
    zoom = Int(12, sync=True, o=True)
    max_zoom = Int(18, sync=True, o=True)
    min_zoom = Int(1, sync=True, o=True)
    # Interaction options
    dragging = Bool(True, sync=True, o=True)
    touch_zoom = Bool(True, sync=True, o=True)
    scroll_wheel_zoom = Bool(False, sync=True, o=True)
    double_click_zoom = Bool(True, sync=True, o=True)
    box_zoom = Bool(True, sync=True, o=True)
    tap = Bool(True, sync=True, o=True)
    tap_tolerance = Int(15, sync=True, o=True)
    world_copy_jump = Bool(False, sync=True, o=True)
    close_popup_on_click = Bool(True, sync=True, o=True)
    bounce_at_zoom_limits = Bool(True, sync=True, o=True)
    keyboard = Bool(True, sync=True, o=True)
    keyboard_pan_offset = Int(80, sync=True, o=True)
    keyboard_zoom_offset = Int(1, sync=True, o=True)
    inertia = Bool(True, sync=True, o=True)
    inertia_deceleration = Int(3000, sync=True, o=True)
    inertia_max_speed = Int(1500, sync=True, o=True)
    # inertia_threshold = Int(?, sync=True, o=True)
    zoom_control = Bool(True, sync=True, o=True)
    attribution_control = Bool(True, sync=True, o=True)
    # fade_animation = Bool(?, sync=True, o=True)
    # zoom_animation = Bool(?, sync=True, o=True)
    zoom_animation_threshold = Int(4, sync=True, o=True)
    # marker_zoom_animation = Bool(?, sync=True, o=True)

    options = List(trait=Unicode, allow_none=False, sync=True)
    def _options_default(self):
        return [name for name in self.traits(o=True)]

    _south = Float(def_loc[0], sync=True)
    _north = Float(def_loc[0], sync=True)
    _east = Float(def_loc[1], sync=True)
    _west = Float(def_loc[1], sync=True)

    default_tiles = Instance(TileLayer, allow_none=True)
    def _default_tiles_default(self):
        return TileLayer()

    @property
    def north(self):
        return self._north
    
    @property
    def south(self):
        return self._south
    
    @property
    def east(self):
        return self._east
    
    @property
    def west(self):
        return self._west
    
    @property
    def bounds_polygon(self):
        return [(self.north,self.west),(self.north,self.east),(self.south,self.east),(self.south,self.west)]

    @property
    def bounds(self):
        return [(self.south,self.west),(self.north,self.east)]

    def __init__(self, **kwargs):
        super(Map, self).__init__(**kwargs)
        self.on_displayed(self._fire_children_displayed)
        if self.default_tiles is not None:
            self.layers = (self.default_tiles,)
        self.on_msg(self._handle_leaflet_event)

    def _fire_children_displayed(self, widget, **kwargs):
        for layer in self.layers:
            layer._handle_displayed(**kwargs)
        for control in self.controls:
            control._handle_displayed(**kwargs)

    layers = Tuple(trait=Instance(Layer), default_value=(), allow_none=False, sync=True)
    layer_ids = List(default_value=[], allow_none=False)

    def _layers_changed(self, name, old, new):
        """Validate layers list.

        Makes sure only one instance of any given layer can exist in the 
        layers list."""
        self.layer_ids = [l.model_id for l in new]
        if len(set(self.layer_ids)) != len(self.layer_ids):
            raise LayerException('duplicate layer detected, only use each layer once')

    def add_layer(self, layer):
        if layer.model_id in self.layer_ids:
            raise LayerException('layer already on map: %r' % layer)
        layer._map = self
        self.layers = tuple([l for l in self.layers] + [layer])
        layer.visible = True

    def remove_layer(self, layer):
        if layer.model_id not in self.layer_ids:
            raise LayerException('layer not on map: %r' % layer)
        self.layers = tuple([l for l in self.layers if l.model_id != layer.model_id])
        layer.visible = False

    def clear_layers(self):
        self.layers = ()

    controls = Tuple(trait=Instance(Control), default_value=(), allow_none=False, sync=True)
    control_ids = List(default_value=[], allow_none=False)

    def _controls_changed(self, name, old, new):
        """Validate controls list.

        Makes sure only one instance of any given layer can exist in the 
        controls list."""
        self.control_ids = [c.model_id for c in new]
        if len(set(self.control_ids)) != len(self.control_ids):
            raise ControlException('duplicate control detected, only use each control once')

    def add_control(self, control):
        if control.model_id in self.control_ids:
            raise ControlException('control already on map: %r' % control)
        control._map = self
        self.controls = tuple([c for c in self.controls] + [control])
        control.visible = True

    def remove_control(self, control):
        if control.model_id not in self.control_ids:
            raise ControlException('control not on map: %r' % control)
        self.controls = tuple([c for c in self.controls if c.model_id != control.model_id])
        control.visible = False

    def clear_controls(self):
        self.controls = ()

    def __iadd__(self, item):
        if isinstance(item, Layer):
            self.add_layer(item)
        elif isinstance(item, Control):
            self.add_control(item)
        return self

    def __isub__(self, item):
        if isinstance(item, Layer):
            self.remove_layer(item)
        elif isinstance(item, Control):
            self.remove_control(item)
        return self

    def __add__(self, item):
        if isinstance(item, Layer):
            self.add_layer(item)
        elif isinstance(item, Control):
            self.add_control(item)
        return self

    def _handle_leaflet_event(self, _, content):
        pass

