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


class UILayer(Layer):
    _view_name = Unicode('LeafletUILayerView', sync=True)


class Marker(UILayer):
    _view_name = Unicode('LeafletMarkerView', sync=True)
    # read/write
    location = List(def_loc, sync=True)
    z_index_offset = Int(0, sync=True)
    opacity = Float(1.0, sync=True)
    # write
    clickable = Bool(True, sync=True)
    draggable = Bool(False, sync=True)
    keyboard = Bool(True, sync=True)
    title = Unicode('', sync=True)
    alt = Unicode('', sync=True)
    rise_on_hover = Bool(False, sync=True)
    rise_offset = Int(250, sync=True)


class Popup(UILayer):
    _view_name = Unicode('LeafletPopupView', sync=True)


class RasterLayer(Layer):
    _view_name = Unicode('LeafletRasterLayerView', sync=True)


class TileLayer(RasterLayer):
    _view_name = Unicode('LeafletTileLayerView', sync=True)
    bottom = Bool(True, sync=True)
    url = Unicode('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', sync=True)
    min_zoom = Int(0, sync=True)
    max_zoom = Int(18, sync=True)
    tile_size = Int(256, sync=True)
    attribution = Unicode('Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', sync=True)
    opacity = Float(1.0, sync=True)
    detect_retina = Bool(False, sync=True)


class ImageOverlay(RasterLayer):
    _view_name = Unicode('LeafletImageOverlayView', sync=True)
    url = Unicode('', sync=True)
    bounds = List([def_loc, def_loc], sync=True, help="SW and NE corners of the image")
    opacity = Float(1.0, sync=True)
    attribution = Unicode('', sync=True)


class VectorLayer(Layer):
    _view_name = Unicode('LeafletVectorLayerView', sync=True)


class Path(VectorLayer):
    _view_name = Unicode('LeafletPathView', sync=True)
    stroke = Bool(True, sync=True)
    color = Unicode('#03F', sync=True)
    weight = Int(5, sync=True)
    opacity = Float(0.5, sync=True)
    fill = Bool(True, sync=True)
    fill_color = Unicode('#03F', sync=True)
    fill_opacity = Float(0.2, sync=True)
    # More options that I havn't implemented go here


class Polyline(Path):
    _view_name = Unicode('LeafletPolylineView', sync=True)
    locations = List([], sync=True)
    smooth_factor = Float(1.0, sync=True)
    no_clip = Bool(False, sync=True)


class Polygon(Polyline):
    _view_name = Unicode('LeafletPolygonView', sync=True)


class Rectangle(Polygon):
    _view_name = Unicode('LeafletPolygonView', sync=True)


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
    
    def _load_json(self, filename):
        with open(filename) as f:
            data = json.load(f)
        return data
    
    def load_data(self, filename):
        self.data = self._load_json(filename)

    def load_style(self, filename):
        self.style = self._load_json(filename)


class MultiPolyline(FeatureGroup):
    _view_name = Unicode('LeafletMultiPolylineView', sync=True)


class MultiPolygon(FeatureGroup):
    _view_name = Unicode('LeafletMultiPolygonView', sync=True)


class Map(widgets.DOMWidget):

    _view_name = Unicode('LeafletMapView', sync=True)
    
    location = List(def_loc, sync=True)
    width = Unicode('600px', sync=True)
    height = Unicode('400px', sync=True)
    zoom_start = Int(12, sync=True)
    zoom = Int(12, sync=True)
    max_zoom = Int(18, sync=True)
    min_zoom = Int(1, sync=True)
    tiles_url = Unicode('http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', sync=True)
    tiles_attr = Unicode('Map data (c) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', sync=True)
    _south = Float(def_loc[0], sync=True)
    _north = Float(def_loc[0], sync=True)
    _east = Float(def_loc[1], sync=True)
    _west = Float(def_loc[1], sync=True)

    layers = Tuple(trait=Instance(Layer), default_value=(), allow_none=False, sync=True)
    layer_ids = List(default_value=[], allow_none=False)

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
    #     
    def __init__(self, **kwargs):
        super(Map, self).__init__(**kwargs)
        self.on_displayed(self._fire_layers_displayed)
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

