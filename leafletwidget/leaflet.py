from __future__ import print_function

import json

from IPython.utils.traitlets import (
    Float, Unicode, Int, Tuple, List, Instance, Bool, Dict
)
from IPython.html import widgets

def_loc = [32.3226932,-90.9019257]

class LayerException(Exception):
    pass


class Layer(widgets.Widget):
    _view_name = Unicode('LeafletLayerView', sync=True)
    bottom = Bool(False, sync=True)
    options = List(trait=Unicode, allow_none=False, sync=True)
    def _options_default(self):
        return [name for name in self.traits(o=True)]


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
    _view_name = Unicode('LeafletPolygonView', sync=True)
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

    def add_layer(self, layer):
        if layer in self.layers:
            return
        self.layers = [l for l in self.layers] + [layer]

    def remove_layer(self, layer):
        if layer not in self.layers:
            return
        self.layers = [l for l in self.layers if l != layer]
    
    def has_layer(self, layer):
        return layer in self.layers
    
    def clear_layers(self):
        self.layers = []

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

    layers = Tuple(trait=Instance(Layer), default_value=(), allow_none=False, sync=True)
    layer_ids = List(default_value=[], allow_none=False)

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
    def bounding_polygon(self):
        return [(self.north,self.west),(self.north,self.east),(self.south,self.east),(self.south,self.west)]

    @property
    def bounds(self):
        return [(self.south,self.west),(self.north,self.east)]

    def __init__(self, **kwargs):
        super(Map, self).__init__(**kwargs)
        self.on_displayed(self._fire_layers_displayed)
        # self.default_tiles = TileLayer()
        if self.default_tiles is not None:
            self.layers = (self.default_tiles,)
        # self.on_msg(self._handle_msg)

    def _fire_layers_displayed(self, widget, **kwargs):
        for layer in self.layers:
            layer._handle_displayed(**kwargs)

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
        self.layers = tuple([l for l in self.layers] + [layer])

    def remove_layer(self, layer):
        if layer not in self.layers:
            raise LayerException('layer not on map: %r' % layer)
        self.layers = tuple([l for l in self.layers if l.model_id != layer.model_id])

    def clear_layers(self):
        self.layers = ()

    # def _handle_msg(self, msg):
    #     print(msg)
        # content = msg['content']['data']['content']
        # if content.get('method') == 'update_bounds':
        #     pass

