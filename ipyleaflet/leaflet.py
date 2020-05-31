# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

import copy

import json

from ipywidgets import (
    Widget, DOMWidget, Box, Color, CallbackDispatcher, widget_serialization,
    interactive, Style
)

from ipywidgets.widgets.trait_types import InstanceDict
from ipywidgets.embed import embed_minimal_html

from traitlets import (
    CFloat, Float, Unicode, Int, Tuple, List, Instance, Bool, Dict, Enum,
    link, observe, default, validate, TraitError, Union, Any
)

from branca.colormap import linear, ColorMap

from ._version import EXTENSION_VERSION

from .projections import projections

def_loc = [0.0, 0.0]
allowed_cursor = ['alias', 'cell', 'grab', 'move', 'crosshair', 'context-menu',
                  'n-resize', 'ne-resize', 'e-resize', 'se-resize', 's-resize',
                  'sw-resize', 'w-resize', 'nw-resize', 'nesw-resize',
                  'nwse-resize', 'row-resize', 'col-resize', 'copy', 'default',
                  'grabbing', 'help', 'no-drop', 'not-allowed', 'pointer',
                  'progress', 'text', 'wait', 'zoom-in', 'zoom-out']


def basemap_to_tiles(basemap, day='yesterday', **kwargs):
    # Format the URL with modisdate
    from datetime import date, timedelta

    if day == 'yesterday':
        yesterday = date.today() - timedelta(1)
        day = yesterday.strftime('%Y-%m-%d')

    url = basemap.get('url', '')
    if url.count('%'):
        url = url % day

    return TileLayer(
        url=url,
        max_zoom=basemap.get('max_zoom', 19),
        min_zoom=basemap.get('min_zoom', 1),
        attribution=basemap.get('attribution', ''),
        name=basemap.get('name', ''),
        **kwargs
    )


class LayerException(TraitError):
    pass


class InteractMixin(object):

    def interact(self, **kwargs):
        c = []
        for name, abbrev in kwargs.items():
            default = getattr(self, name)
            widget = interactive.widget_from_abbrev(abbrev, default)
            if not widget.description:
                widget.description = name
            widget.link = link((widget, 'value'), (self, name))
            c.append(widget)
        cont = Box(children=c)
        return cont


class Layer(Widget, InteractMixin):
    _view_name = Unicode('LeafletLayerView').tag(sync=True)
    _model_name = Unicode('LeafletLayerModel').tag(sync=True)
    _view_module = Unicode('jupyter-leaflet').tag(sync=True)
    _model_module = Unicode('jupyter-leaflet').tag(sync=True)

    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    name = Unicode('').tag(sync=True)
    base = Bool(False).tag(sync=True)
    bottom = Bool(False).tag(sync=True)
    popup = Instance(Widget, allow_none=True, default_value=None).tag(sync=True, **widget_serialization)
    popup_min_width = Int(50).tag(sync=True)
    popup_max_width = Int(300).tag(sync=True)
    popup_max_height = Int(default_value=None, allow_none=True).tag(sync=True)

    options = List(trait=Unicode()).tag(sync=True)

    def __init__(self, **kwargs):
        super(Layer, self).__init__(**kwargs)
        self.on_msg(self._handle_mouse_events)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]

    # Event handling
    _click_callbacks = Instance(CallbackDispatcher, ())
    _dblclick_callbacks = Instance(CallbackDispatcher, ())
    _mousedown_callbacks = Instance(CallbackDispatcher, ())
    _mouseup_callbacks = Instance(CallbackDispatcher, ())
    _mouseover_callbacks = Instance(CallbackDispatcher, ())
    _mouseout_callbacks = Instance(CallbackDispatcher, ())

    def _handle_mouse_events(self, _, content, buffers):
        event_type = content.get('type', '')
        if event_type == 'click':
            self._click_callbacks(**content)
        if event_type == 'dblclick':
            self._dblclick_callbacks(**content)
        if event_type == 'mousedown':
            self._mousedown_callbacks(**content)
        if event_type == 'mouseup':
            self._mouseup_callbacks(**content)
        if event_type == 'mouseover':
            self._mouseover_callbacks(**content)
        if event_type == 'mouseout':
            self._mouseout_callbacks(**content)

    def on_click(self, callback, remove=False):
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_dblclick(self, callback, remove=False):
        self._dblclick_callbacks.register_callback(callback, remove=remove)

    def on_mousedown(self, callback, remove=False):
        self._mousedown_callbacks.register_callback(callback, remove=remove)

    def on_mouseup(self, callback, remove=False):
        self._mouseup_callbacks.register_callback(callback, remove=remove)

    def on_mouseover(self, callback, remove=False):
        self._mouseover_callbacks.register_callback(callback, remove=remove)

    def on_mouseout(self, callback, remove=False):
        self._mouseout_callbacks.register_callback(callback, remove=remove)


class UILayer(Layer):
    _view_name = Unicode('LeafletUILayerView').tag(sync=True)
    _model_name = Unicode('LeafletUILayerModel').tag(sync=True)


class Icon(UILayer):
    _view_name = Unicode('LeafletIconView').tag(sync=True)
    _model_name = Unicode('LeafletIconModel').tag(sync=True)

    icon_url = Unicode('').tag(sync=True, o=True)
    shadow_url = Unicode(None, allow_none=True).tag(sync=True, o=True)
    icon_size = Tuple((10, 10), allow_none=True).tag(sync=True, o=True)
    shadow_size = Tuple((10, 10), allow_none=True).tag(sync=True, o=True)
    icon_anchor = Tuple((0, 0), allow_none=True).tag(sync=True, o=True)
    shadow_anchor = Tuple((0, 0), allow_none=True).tag(sync=True, o=True)
    popup_anchor = Tuple((0, 0), allow_none=True).tag(sync=True, o=True)


class AwesomeIcon(UILayer):
    _view_name = Unicode('LeafletAwesomeIconView').tag(sync=True)
    _model_name = Unicode('LeafletAwesomeIconModel').tag(sync=True)

    name = Unicode('home').tag(sync=True)
    marker_color = Enum(
        values=['white', 'red', 'darkred', 'lightred', 'orange', 'beige', 'green', 'darkgreen', 'lightgreen', 'blue',
                'darkblue', 'lightblue', 'purple', 'darkpurple', 'pink', 'cadetblue', 'white', 'gray', 'lightgray',
                'black'],
        default_value='blue'
    ).tag(sync=True)
    icon_color = Color('white').tag(sync=True)
    spin = Bool(False).tag(sync=True)


class Marker(UILayer):
    _view_name = Unicode('LeafletMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletMarkerModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True)
    visible = Bool(True).tag(sync=True)
    icon = Union((Instance(Icon), Instance(AwesomeIcon)), allow_none=True, default_value=None).tag(sync=True,
                                                                                                   **widget_serialization)

    # Options
    z_index_offset = Int(0).tag(sync=True, o=True)
    draggable = Bool(True).tag(sync=True, o=True)
    keyboard = Bool(True).tag(sync=True, o=True)
    title = Unicode('').tag(sync=True, o=True)
    alt = Unicode('').tag(sync=True, o=True)
    rise_on_hover = Bool(False).tag(sync=True, o=True)
    rise_offset = Int(250).tag(sync=True, o=True)
    rotation_angle = Float(0).tag(sync=True, o=True)
    rotation_origin = Unicode('').tag(sync=True, o=True)

    _move_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(Marker, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'move':
            self._move_callbacks(**content)

    def on_move(self, callback, remove=False):
        self._move_callbacks.register_callback(callback, remove=remove)


class Popup(UILayer):
    _view_name = Unicode('LeafletPopupView').tag(sync=True)
    _model_name = Unicode('LeafletPopupModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)
    child = Instance(
        DOMWidget, allow_none=True, default_value=None
    ).tag(sync=True, **widget_serialization)

    # Options
    min_width = Int(50).tag(sync=True, o=True)
    max_width = Int(300).tag(sync=True, o=True)
    max_height = Int(default_value=None, allow_none=True).tag(sync=True, o=True)
    auto_pan = Bool(True).tag(sync=True, o=True)
    auto_pan_padding_top_left = List(allow_none=True, default_value=None).tag(sync=True, o=True)
    auto_pan_padding_bottom_right = List(allow_none=True, default_value=None).tag(sync=True, o=True)
    auto_pan_padding = List([5, 5]).tag(sync=True, o=True)
    keep_in_view = Bool(False).tag(sync=True, o=True)
    close_button = Bool(True).tag(sync=True, o=True)
    auto_close = Bool(True).tag(sync=True, o=True)
    close_on_escape_key = Bool(True).tag(sync=True, o=True)
    class_name = Unicode('').tag(sync=True, o=True)


class RasterLayer(Layer):
    _view_name = Unicode('LeafletRasterLayerView').tag(sync=True)
    _model_name = Unicode('LeafletRasterLayerModel').tag(sync=True)

    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True)
    visible = Bool(True).tag(sync=True)


class TileLayer(RasterLayer):
    _view_name = Unicode('LeafletTileLayerView').tag(sync=True)
    _model_name = Unicode('LeafletTileLayerModel').tag(sync=True)

    bottom = Bool(True).tag(sync=True)
    url = Unicode('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').tag(sync=True)
    min_zoom = Int(0).tag(sync=True, o=True)
    max_zoom = Int(18).tag(sync=True, o=True)
    min_native_zoom = Int(0).tag(sync=True, o=True)
    max_native_zoom = Int(18).tag(sync=True, o=True)
    tile_size = Int(256).tag(sync=True, o=True)
    attribution = Unicode('Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors').tag(
        sync=True, o=True)
    detect_retina = Bool(False).tag(sync=True, o=True)
    no_wrap = Bool(False).tag(sync=True, o=True)
    tms = Bool(False).tag(sync=True, o=True)
    show_loading = Bool(False).tag(sync=True)
    loading = Bool(False, read_only=True).tag(sync=True)

    _load_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(TileLayer, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'load':
            self._load_callbacks(**content)

    def on_load(self, callback, remove=False):
        self._load_callbacks.register_callback(callback, remove=remove)

    def redraw(self):
        self.send({'msg': 'redraw'})


class LocalTileLayer(TileLayer):
    _view_name = Unicode('LeafletLocalTileLayerView').tag(sync=True)
    _model_name = Unicode('LeafletLocalTileLayerModel').tag(sync=True)

    path = Unicode('').tag(sync=True)


class WMSLayer(TileLayer):
    _view_name = Unicode('LeafletWMSLayerView').tag(sync=True)
    _model_name = Unicode('LeafletWMSLayerModel').tag(sync=True)

    service = Unicode('WMS').tag(sync=True)
    request = Unicode('GetMap').tag(sync=True)
    version = Unicode('1.1.1').tag(sync=True)

    # Options
    layers = Unicode().tag(sync=True, o=True)
    styles = Unicode().tag(sync=True, o=True)
    format = Unicode('image/jpeg').tag(sync=True, o=True)
    transparent = Bool(False).tag(sync=True, o=True)
    crs = Dict(default_value=projections.EPSG3857).tag(sync=True)
    uppercase = Bool(False).tag(sync=True, o=True)


class ImageOverlay(RasterLayer):
    _view_name = Unicode('LeafletImageOverlayView').tag(sync=True)
    _model_name = Unicode('LeafletImageOverlayModel').tag(sync=True)

    url = Unicode().tag(sync=True)
    bounds = List([def_loc, def_loc], help='SW and NE corners of the image').tag(sync=True)

    # Options
    attribution = Unicode().tag(sync=True, o=True)


class VideoOverlay(RasterLayer):
    _view_name = Unicode('LeafletVideoOverlayView').tag(sync=True)
    _model_name = Unicode('LeafletVideoOverlayModel').tag(sync=True)

    url = Unicode().tag(sync=True)
    bounds = List([def_loc, def_loc], help='SW and NE corners of the image').tag(sync=True)

    # Options
    attribution = Unicode().tag(sync=True, o=True)


class Heatmap(RasterLayer):
    _view_name = Unicode('LeafletHeatmapView').tag(sync=True)
    _model_name = Unicode('LeafletHeatmapModel').tag(sync=True)

    locations = List().tag(sync=True)

    # Options
    min_opacity = Float(0.05).tag(sync=True, o=True)
    max_zoom = Int(18).tag(sync=True, o=True)
    max = Float(1.0).tag(sync=True, o=True)
    radius = Float(25.0).tag(sync=True, o=True)
    blur = Float(15.0).tag(sync=True, o=True)
    gradient = Dict({0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}).tag(sync=True, o=True)


class VectorTileLayer(Layer):
    _view_name = Unicode('LeafletVectorTileLayerView').tag(sync=True)
    _model_name = Unicode('LeafletVectorTileLayerModel').tag(sync=True)

    url = Unicode().tag(sync=True, o=True)
    attribution = Unicode().tag(sync=True, o=True)

    vector_tile_layer_styles = Dict().tag(sync=True, o=True)

    def redraw(self):
        self.send({'msg': 'redraw'})


class VectorLayer(Layer):
    _view_name = Unicode('LeafletVectorLayerView').tag(sync=True)
    _model_name = Unicode('LeafletVectorLayerModel').tag(sync=True)


class Path(VectorLayer):
    _view_name = Unicode('LeafletPathView').tag(sync=True)
    _model_name = Unicode('LeafletPathModel').tag(sync=True)

    # Options
    stroke = Bool(True).tag(sync=True, o=True)
    color = Color('#0033FF').tag(sync=True, o=True)
    weight = Int(5).tag(sync=True, o=True)
    fill = Bool(True).tag(sync=True, o=True)
    fill_color = Color(None, allow_none=True).tag(sync=True, o=True)
    fill_opacity = Float(0.2).tag(sync=True, o=True)
    dash_array = Unicode(allow_none=True, default_value=None).tag(sync=True, o=True)
    line_cap = Unicode('round').tag(sync=True, o=True)
    line_join = Unicode('round').tag(sync=True, o=True)
    pointer_events = Unicode('').tag(sync=True, o=True)
    class_name = Unicode('').tag(sync=True, o=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True, o=True)


class AntPath(VectorLayer):
    _view_name = Unicode('LeafletAntPathView').tag(sync=True)
    _model_name = Unicode('LeafletAntPathModel').tag(sync=True)

    locations = List().tag(sync=True)

    # Options
    use = Enum(values=['polyline', 'polygon', 'rectangle', 'circle'], default_value='polyline').tag(sync=True, o=True)
    delay = Int(400).tag(sync=True, o=True)
    weight = Int(5).tag(sync=True, o=True)
    dash_array = List([10, 20]).tag(sync=True, o=True)
    color = Color('#0000FF').tag(sync=True, o=True)
    pulse_color = Color('#FFFFFF').tag(sync=True, o=True)
    paused = Bool(False).tag(sync=True, o=True)
    reverse = Bool(False).tag(sync=True, o=True)
    hardware_accelerated = Bool(False).tag(sync=True, o=True)
    radius = Int(10).tag(sync=True, o=True)


class Polyline(Path):
    _view_name = Unicode('LeafletPolylineView').tag(sync=True)
    _model_name = Unicode('LeafletPolylineModel').tag(sync=True)

    locations = List().tag(sync=True)
    scaling = Bool(True).tag(sync=True)
    rotation = Bool(True).tag(sync=True)
    uniform_scaling = Bool(False).tag(sync=True)

    # Options
    smooth_factor = Float(1.0).tag(sync=True, o=True)
    no_clip = Bool(True).tag(sync=True, o=True)
    transform = Bool(False).tag(sync=True, o=True)
    draggable = Bool(False).tag(sync=True, o=True)


class Polygon(Polyline):
    _view_name = Unicode('LeafletPolygonView').tag(sync=True)
    _model_name = Unicode('LeafletPolygonModel').tag(sync=True)


class Rectangle(Polygon):
    _view_name = Unicode('LeafletRectangleView').tag(sync=True)
    _model_name = Unicode('LeafletRectangleModel').tag(sync=True)

    bounds = List(help='list of SW and NE location tuples').tag(sync=True)


class CircleMarker(Path):
    _view_name = Unicode('LeafletCircleMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletCircleMarkerModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)

    # Options
    radius = Int(10, help='radius of circle in pixels').tag(sync=True, o=True)


class Circle(CircleMarker):
    _view_name = Unicode('LeafletCircleView').tag(sync=True)
    _model_name = Unicode('LeafletCircleModel').tag(sync=True)

    # Options
    radius = Int(1000, help='radius of circle in meters').tag(sync=True, o=True)


class MarkerCluster(Layer):
    _view_name = Unicode('LeafletMarkerClusterView').tag(sync=True)
    _model_name = Unicode('LeafletMarkerClusterModel').tag(sync=True)

    markers = Tuple().tag(trait=Instance(Marker), sync=True, **widget_serialization)


class LayerGroup(Layer):
    _view_name = Unicode('LeafletLayerGroupView').tag(sync=True)
    _model_name = Unicode('LeafletLayerGroupModel').tag(sync=True)

    layers = Tuple().tag(trait=Instance(Layer), sync=True, **widget_serialization)

    _layer_ids = List()

    @validate('layers')
    def _validate_layers(self, proposal):
        '''Validate layers list.

        Makes sure only one instance of any given layer can exist in the
        layers list.
        '''
        self._layer_ids = [l.model_id for l in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise LayerException('duplicate layer detected, only use each layer once')
        return proposal.value

    def add_layer(self, layer):
        if isinstance(layer, dict):
            layer = basemap_to_tiles(layer)
        if layer.model_id in self._layer_ids:
            raise LayerException('layer already in layergroup: %r' % layer)
        self.layers = tuple([l for l in self.layers] + [layer])

    def remove_layer(self, layer):
        if layer.model_id not in self._layer_ids:
            raise LayerException('layer not on in layergroup: %r' % layer)
        self.layers = tuple([l for l in self.layers if l.model_id != layer.model_id])

    def substitute_layer(self, old, new):
        if isinstance(new, dict):
            new = basemap_to_tiles(new)
        if old.model_id not in self._layer_ids:
            raise LayerException('Could not substitute layer: layer not in layergroup.')
        self.layers = tuple([new if l.model_id == old.model_id else l for l in self.layers])

    def clear_layers(self):
        self.layers = ()


class FeatureGroup(LayerGroup):
    _view_name = Unicode('LeafletFeatureGroupView').tag(sync=True)
    _model_name = Unicode('LeafletFeatureGroupModel').tag(sync=True)


class GeoJSON(FeatureGroup):
    _view_name = Unicode('LeafletGeoJSONView').tag(sync=True)
    _model_name = Unicode('LeafletGeoJSONModel').tag(sync=True)

    data = Dict().tag(sync=True)
    style = Dict().tag(sync=True)
    hover_style = Dict().tag(sync=True)
    point_style = Dict().tag(sync=True)
    style_callback = Any()

    _click_callbacks = Instance(CallbackDispatcher, ())
    _hover_callbacks = Instance(CallbackDispatcher, ())

    @validate('style_callback')
    def _validate_style_callback(self, proposal):
        if not callable(proposal.value):
            raise TraitError('style_callback should be callable (functor/function/lambda)')
        return proposal.value

    @observe('data', 'style', 'style_callback')
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        if 'type' not in self.data:
            # We can't apply a style we don't know what the data look like
            return self.data

        datatype = self.data['type']

        style_callback = None
        if self.style_callback:
            style_callback = self.style_callback
        elif self.style:
            style_callback = lambda feature: self.style
        else:
            # No style to apply
            return self.data

        if datatype == 'Feature':
            self._apply_style(self.data, style_callback)
        elif datatype == 'FeatureCollection':
            for feature in self.data['features']:
                self._apply_style(feature, style_callback)

        return self.data

    def _apply_style(self, feature, style_callback):
        if 'properties' not in feature:
            feature['properties'] = {}

        properties = feature['properties']
        if 'style' in properties:
            style = properties['style'].copy()
            style.update(style_callback(feature))
            properties['style'] = style
        else:
            properties['style'] = style_callback(feature)

    def __init__(self, **kwargs):
        super(GeoJSON, self).__init__(**kwargs)
        self.on_msg(self._handle_m_msg)
        self.data = self._get_data()

    def _handle_m_msg(self, _, content, buffers):
        if content.get('event', '') == 'click':
            self._click_callbacks(**content)
        if content.get('event', '') == 'mouseover':
            self._hover_callbacks(**content)

    def on_click(self, callback, remove=False):
        '''
        The click callback takes an unpacked set of keyword arguments.
        '''
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_hover(self, callback, remove=False):
        '''
        The hover callback takes an unpacked set of keyword arguments.
        '''
        self._hover_callbacks.register_callback(callback, remove=remove)


class GeoData(GeoJSON):
    geo_dataframe = Instance('geopandas.GeoDataFrame')

    def __init__(self, **kwargs):
        super(GeoData, self).__init__(**kwargs)
        self.data = self._get_data()

    @observe('geo_dataframe', 'style', 'style_callback')
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        return json.loads(self.geo_dataframe.to_json())


class Choropleth(GeoJSON):
    geo_data = Dict()
    choro_data = Dict()
    value_min = CFloat(None, allow_none=True)
    value_max = CFloat(None, allow_none=True)
    colormap = Instance(ColorMap)
    key_on = Unicode('id')

    @observe('style', 'style_callback', 'value_min', 'value_max', 'geo_data', 'choro_data', 'colormap')
    def _update_data(self, change):
        self.data = self._get_data()

    @default('colormap')
    def _default_colormap(self):
        return linear.OrRd_06

    @default('style_callback')
    def _default_style_callback(self):
        def compute_style(feature, colormap, choro_data):
            return dict(
                fillColor=colormap(choro_data),
                color='black',
                weight=0.9
            )

        return compute_style

    def _get_data(self):
        if not self.geo_data:
            return {}

        if self.value_min is None:
            self.value_min = min(self.choro_data.items(), key=lambda x: x[1])[1]
        if self.value_max is None:
            self.value_max = max(self.choro_data.items(), key=lambda x: x[1])[1]

        colormap = self.colormap.scale(self.value_min, self.value_max)
        data = copy.deepcopy(self.geo_data)

        for feature in data['features']:
            feature['properties']['style'] = self.style_callback(feature, colormap,
                                                                 self.choro_data[feature[self.key_on]])

        return data

    def __init__(self, **kwargs):
        super(Choropleth, self).__init__(**kwargs)
        self.data = self._get_data()


class ControlException(TraitError):
    pass


class Control(Widget):
    _view_name = Unicode('LeafletControlView').tag(sync=True)
    _model_name = Unicode('LeafletControlModel').tag(sync=True)
    _view_module = Unicode('jupyter-leaflet').tag(sync=True)
    _model_module = Unicode('jupyter-leaflet').tag(sync=True)

    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    options = List(trait=Unicode()).tag(sync=True)

    position = Enum(
        ['topright', 'topleft', 'bottomright', 'bottomleft'],
        default_value='topleft',
        help="""Possible values are topleft, topright, bottomleft
                or bottomright"""
    ).tag(sync=True, o=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]


class WidgetControl(Control):
    _view_name = Unicode('LeafletWidgetControlView').tag(sync=True)
    _model_name = Unicode('LeafletWidgetControlModel').tag(sync=True)

    widget = Instance(DOMWidget).tag(sync=True, **widget_serialization)

    max_width = Int(default_value=None, allow_none=True).tag(sync=True)
    min_width = Int(default_value=None, allow_none=True).tag(sync=True)
    max_height = Int(default_value=None, allow_none=True).tag(sync=True)
    min_height = Int(default_value=None, allow_none=True).tag(sync=True)


class FullScreenControl(Control):
    _view_name = Unicode('LeafletFullScreenControlView').tag(sync=True)
    _model_name = Unicode('LeafletFullScreenControlModel').tag(sync=True)


class LayersControl(Control):
    _view_name = Unicode('LeafletLayersControlView').tag(sync=True)
    _model_name = Unicode('LeafletLayersControlModel').tag(sync=True)


class MeasureControl(Control):
    _view_name = Unicode('LeafletMeasureControlView').tag(sync=True)
    _model_name = Unicode('LeafletMeasureControlModel').tag(sync=True)

    _length_units = ['feet', 'meters', 'miles', 'kilometers']
    _area_units = ['acres', 'hectares', 'sqfeet', 'sqmeters', 'sqmiles']
    _custom_units_dict = {}
    _custom_units = Dict().tag(sync=True)

    primary_length_unit = Enum(
        values=_length_units,
        default_value='feet',
        help="""Possible values are feet, meters, miles, kilometers or any user
                defined unit"""
    ).tag(sync=True, o=True)

    secondary_length_unit = Enum(
        values=_length_units,
        default_value=None,
        allow_none=True,
        help="""Possible values are feet, meters, miles, kilometers or any user
                defined unit"""
    ).tag(sync=True, o=True)

    primary_area_unit = Enum(
        values=_area_units,
        default_value='acres',
        help="""Possible values are acres, hectares, sqfeet, sqmeters, sqmiles
                or any user defined unit"""
    ).tag(sync=True, o=True)

    secondary_area_unit = Enum(
        values=_area_units,
        default_value=None,
        allow_none=True,
        help="""Possible values are acres, hectares, sqfeet, sqmeters, sqmiles
                or any user defined unit"""
    ).tag(sync=True, o=True)

    active_color = Color('#ABE67E').tag(sync=True, o=True)
    completed_color = Color('#C8F2BE').tag(sync=True, o=True)

    popup_options = Dict({
        'className': 'leaflet-measure-resultpopup',
        'autoPanPadding': [10, 10]
    }).tag(sync=True, o=True)

    capture_z_index = Int(10000).tag(sync=True, o=True)

    def add_length_unit(self, name, factor, decimals=0):
        self._length_units.append(name)
        self._add_unit(name, factor, decimals)

    def add_area_unit(self, name, factor, decimals=0):
        self._area_units.append(name)
        self._add_unit(name, factor, decimals)

    def _add_unit(self, name, factor, decimals):
        self._custom_units_dict[name] = {
            'factor': factor,
            'display': name,
            'decimals': decimals
        }
        self._custom_units = dict(**self._custom_units_dict)


class SplitMapControl(Control):
    _view_name = Unicode('LeafletSplitMapControlView').tag(sync=True)
    _model_name = Unicode('LeafletSplitMapControlModel').tag(sync=True)

    left_layer = Union((Instance(Layer), List(Instance(Layer)))).tag(sync=True, **widget_serialization)
    right_layer = Union((Instance(Layer), List(Instance(Layer)))).tag(sync=True, **widget_serialization)

    @default('left_layer')
    def _default_left_layer(self):
        return TileLayer()

    @default('right_layer')
    def _default_right_layer(self):
        return TileLayer()

    def __init__(self, **kwargs):
        super(SplitMapControl, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'dividermove':
            event = content.get('event')
            self.x = event.x


class DrawControl(Control):
    _view_name = Unicode('LeafletDrawControlView').tag(sync=True)
    _model_name = Unicode('LeafletDrawControlModel').tag(sync=True)

    # Enable each of the following drawing by giving them a non empty dict of options
    # You can add Leaflet style options in the shapeOptions sub-dict
    # See https://github.com/Leaflet/Leaflet.draw#polylineoptions
    # TODO: mutable default value!
    polyline = Dict({'shapeOptions': {}}).tag(sync=True)
    # See https://github.com/Leaflet/Leaflet.draw#polygonoptions
    # TODO: mutable default value!
    polygon = Dict({'shapeOptions': {}}).tag(sync=True)
    circlemarker = Dict({'shapeOptions': {}}).tag(sync=True)

    # Leave empty to disable these
    circle = Dict().tag(sync=True)
    rectangle = Dict().tag(sync=True)
    marker = Dict().tag(sync=True)

    # Edit tools
    edit = Bool(True).tag(sync=True)
    remove = Bool(True).tag(sync=True)

    last_draw = Dict({
        'type': 'Feature',
        'geometry': None
    })
    last_action = Unicode()

    _draw_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(DrawControl, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '').startswith('draw'):
            event, action = content.get('event').split(':')
            self.last_draw = content.get('geo_json')
            self.last_action = action
            self._draw_callbacks(self, action=action, geo_json=self.last_draw)

    def on_draw(self, callback, remove=False):
        self._draw_callbacks.register_callback(callback, remove=remove)

    def clear(self):
        self.send({'msg': 'clear'})

    def clear_polylines(self):
        self.send({'msg': 'clear_polylines'})

    def clear_polygons(self):
        self.send({'msg': 'clear_polygons'})

    def clear_circles(self):
        self.send({'msg': 'clear_circles'})

    def clear_circle_markers(self):
        self.send({'msg': 'clear_circle_markers'})

    def clear_rectangles(self):
        self.send({'msg': 'clear_rectangles'})

    def clear_markers(self):
        self.send({'msg': 'clear_markers'})


class ZoomControl(Control):
    _view_name = Unicode('LeafletZoomControlView').tag(sync=True)
    _model_name = Unicode('LeafletZoomControlModel').tag(sync=True)

    zoom_in_text = Unicode('+').tag(sync=True, o=True)
    zoom_in_title = Unicode('Zoom in').tag(sync=True, o=True)
    zoom_out_text = Unicode('-').tag(sync=True, o=True)
    zoom_out_title = Unicode('Zoom out').tag(sync=True, o=True)


class ScaleControl(Control):
    _view_name = Unicode('LeafletScaleControlView').tag(sync=True)
    _model_name = Unicode('LeafletScaleControlModel').tag(sync=True)

    max_width = Int(100).tag(sync=True, o=True)
    metric = Bool(True).tag(sync=True, o=True)
    imperial = Bool(True).tag(sync=True, o=True)
    update_when_idle = Bool(False).tag(sync=True, o=True)


class AttributionControl(Control):
    _view_name = Unicode('LeafletAttributionControlView').tag(sync=True)
    _model_name = Unicode('LeafletAttributionControlModel').tag(sync=True)

    prefix = Unicode('Leaflet').tag(sync=True, o=True)


class LegendControl(Control):
    _view_name = Unicode('LeafletLegendControlView').tag(sync=True)
    _model_name = Unicode('LeafletLegendControlModel').tag(sync=True)
    title = Unicode('Legend').tag(sync=True)
    legend = Dict(default_value={
        "value 1": "#AAF",
        "value 2": "#55A",
        "value 3": "#005"}).tag(sync=True)

    def __init__(self, legend, *args, name="Legend", **kwargs):
        super().__init__(*args, **kwargs)
        self.title = name
        self.legend = legend

    @property
    def name(self):
        return self.title

    @name.setter
    def name(self, title):
        self.title = title

    @property
    def legends(self):
        return self.legend

    @legends.setter
    def legends(self, legends):
        self.legend = legends

    @property
    def positionning(self):
        return self.position

    @positionning.setter
    def positionning(self, position):
        self.position = position

    def add_legend_element(self, key, value):
        self.legend[key] = value
        self.send_state()

    def remove_legend_element(self, key):
        del self.legend[key]
        self.send_state()


class SearchControl(Control):
    _view_name = Unicode('LeafletSearchControlView').tag(sync=True)
    _model_name = Unicode('LeafletSearchControlModel').tag(sync=True)

    url = Unicode().tag(sync=True, o=True)
    zoom = Int(10).tag(sync=True, o=True)
    property_name = Unicode('display_name').tag(sync=True, o=True)
    property_loc = List(['lat', 'lon']).tag(sync=True, o=True)
    jsonp_param = Unicode('json_callback').tag(sync=True, o=True)
    auto_type = Bool(False).tag(sync=True, o=True)
    auto_collapse = Bool(False).tag(sync=True, o=True)
    animate_location = Bool(False).tag(sync=True, o=True)

    marker = Instance(Marker).tag(sync=True, **widget_serialization)


class MapStyle(Style, Widget):
    """ Map Style Widget """
    _model_name = Unicode('LeafletMapStyleModel').tag(sync=True)
    _model_module = Unicode("jupyter-leaflet").tag(sync=True)

    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    cursor = Enum(values=allowed_cursor, default_value='grab').tag(sync=True)


class Map(DOMWidget, InteractMixin):
    _view_name = Unicode('LeafletMapView').tag(sync=True)
    _model_name = Unicode('LeafletMapModel').tag(sync=True)
    _view_module = Unicode('jupyter-leaflet').tag(sync=True)
    _model_module = Unicode('jupyter-leaflet').tag(sync=True)

    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    # URL of the window where the map is displayed
    window_url = Unicode(read_only=True).tag(sync=True)

    # Map options
    center = List(def_loc).tag(sync=True, o=True)
    zoom_start = CFloat(12).tag(sync=True, o=True)
    zoom = CFloat(12).tag(sync=True, o=True)
    max_zoom = CFloat(18).tag(sync=True, o=True)
    min_zoom = CFloat(1).tag(sync=True, o=True)
    interpolation = Unicode('bilinear').tag(sync=True, o=True)
    crs = Dict(default_value=projections.EPSG3857).tag(sync=True)

    # Specification of the basemap
    basemap = Union(
        (Dict(), Instance(TileLayer)),
        default_value=dict(
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            max_zoom=19,
            attribution='Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        ))
    modisdate = Unicode('yesterday').tag(sync=True)

    # Interaction options
    dragging = Bool(True).tag(sync=True, o=True)
    touch_zoom = Bool(True).tag(sync=True, o=True)
    scroll_wheel_zoom = Bool(False).tag(sync=True, o=True)
    double_click_zoom = Bool(True).tag(sync=True, o=True)
    box_zoom = Bool(True).tag(sync=True, o=True)
    tap = Bool(True).tag(sync=True, o=True)
    tap_tolerance = Int(15).tag(sync=True, o=True)
    world_copy_jump = Bool(False).tag(sync=True, o=True)
    close_popup_on_click = Bool(True).tag(sync=True, o=True)
    bounce_at_zoom_limits = Bool(True).tag(sync=True, o=True)
    keyboard = Bool(True).tag(sync=True, o=True)
    keyboard_pan_offset = Int(80).tag(sync=True, o=True)
    keyboard_zoom_offset = Int(1).tag(sync=True, o=True)
    inertia = Bool(True).tag(sync=True, o=True)
    inertia_deceleration = Int(3000).tag(sync=True, o=True)
    inertia_max_speed = Int(1500).tag(sync=True, o=True)
    # inertia_threshold = Int(?, o=True).tag(sync=True)
    # fade_animation = Bool(?).tag(sync=True, o=True)
    # zoom_animation = Bool(?).tag(sync=True, o=True)
    zoom_animation_threshold = Int(4).tag(sync=True, o=True)
    # marker_zoom_animation = Bool(?).tag(sync=True, o=True)
    fullscreen = Bool(False).tag(sync=True, o=True)

    options = List(trait=Unicode()).tag(sync=True)

    style = InstanceDict(MapStyle).tag(sync=True, **widget_serialization)
    default_style = InstanceDict(MapStyle).tag(sync=True, **widget_serialization)
    dragging_style = InstanceDict(MapStyle).tag(sync=True, **widget_serialization)

    zoom_control = Bool(True)
    attribution_control = Bool(True)

    @default('dragging_style')
    def _default_dragging_style(self):
        return {'cursor': 'move'}

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]

    south = Float(def_loc[0], read_only=True).tag(sync=True)
    north = Float(def_loc[0], read_only=True).tag(sync=True)
    east = Float(def_loc[1], read_only=True).tag(sync=True)
    west = Float(def_loc[1], read_only=True).tag(sync=True)

    layers = Tuple().tag(trait=Instance(Layer), sync=True, **widget_serialization)

    @default('layers')
    def _default_layers(self):
        basemap = self.basemap if isinstance(self.basemap, TileLayer) else basemap_to_tiles(self.basemap,
                                                                                            self.modisdate)

        basemap.base = True

        return (basemap,)

    bounds = Tuple(read_only=True)
    bounds_polygon = Tuple(read_only=True)

    @observe('south', 'north', 'east', 'west')
    def _observe_bounds(self, change):
        self.set_trait('bounds', ((self.south, self.west),
                                  (self.north, self.east)))
        self.set_trait('bounds_polygon', ((self.north, self.west),
                                          (self.north, self.east),
                                          (self.south, self.east),
                                          (self.south, self.west)))

    def __init__(self, **kwargs):
        self.zoom_control_instance = None
        self.attribution_control_instance = None

        super(Map, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

        if self.zoom_control:
            self.zoom_control_instance = ZoomControl()
            self.add_control(self.zoom_control_instance)

        if self.attribution_control:
            self.attribution_control_instance = AttributionControl(position='bottomright')
            self.add_control(self.attribution_control_instance)

    @observe('zoom_control')
    def observe_zoom_control(self, change):
        if change['new']:
            self.zoom_control_instance = ZoomControl()
            self.add_control(self.zoom_control_instance)
        else:
            if self.zoom_control_instance is not None and self.zoom_control_instance in self.controls:
                self.remove_control(self.zoom_control_instance)

    @observe('attribution_control')
    def observe_attribution_control(self, change):
        if change['new']:
            self.attribution_control_instance = AttributionControl(position='bottomright')
            self.add_control(self.attribution_control_instance)
        else:
            if self.attribution_control_instance is not None and self.attribution_control_instance in self.controls:
                self.remove_control(self.attribution_control_instance)

    _layer_ids = List()

    @validate('layers')
    def _validate_layers(self, proposal):
        '''Validate layers list.

        Makes sure only one instance of any given layer can exist in the
        layers list.
        '''
        self._layer_ids = [l.model_id for l in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise LayerException('duplicate layer detected, only use each layer once')
        return proposal.value

    def add_layer(self, layer):
        if isinstance(layer, dict):
            layer = basemap_to_tiles(layer)
        if layer.model_id in self._layer_ids:
            raise LayerException('layer already on map: %r' % layer)
        self.layers = tuple([l for l in self.layers] + [layer])

    def remove_layer(self, layer):
        if layer.model_id not in self._layer_ids:
            raise LayerException('layer not on map: %r' % layer)
        self.layers = tuple([l for l in self.layers if l.model_id != layer.model_id])

    def substitute_layer(self, old, new):
        if isinstance(new, dict):
            new = basemap_to_tiles(new)
        if old.model_id not in self._layer_ids:
            raise LayerException('Could not substitute layer: layer not on map.')
        self.layers = tuple([new if l.model_id == old.model_id else l for l in self.layers])

    def clear_layers(self):
        self.layers = ()

    controls = Tuple().tag(trait=Instance(Control), sync=True, **widget_serialization)
    _control_ids = List()

    @validate('controls')
    def _validate_controls(self, proposal):
        '''Validate controls list.

        Makes sure only one instance of any given layer can exist in the
        controls list.
        '''
        self._control_ids = [c.model_id for c in proposal.value]
        if len(set(self._control_ids)) != len(self._control_ids):
            raise ControlException('duplicate control detected, only use each control once')
        return proposal.value

    def add_control(self, control):
        if control.model_id in self._control_ids:
            raise ControlException('control already on map: %r' % control)
        self.controls = tuple([c for c in self.controls] + [control])

    def remove_control(self, control):
        if control.model_id not in self._control_ids:
            raise ControlException('control not on map: %r' % control)
        self.controls = tuple([c for c in self.controls if c.model_id != control.model_id])

    def clear_controls(self):
        self.controls = ()

    def save(self, outfile, **kwargs):
        """Save the Map to an .html file.

        Parameters
        ----------
        outfile: str or file-like object
            The file to write the HTML output to.
        kwargs: keyword-arguments
            Extra parameters to pass to the ipywidgets.embed.embed_minimal_html function.
        """
        embed_minimal_html(outfile, views=[self], **kwargs)

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

    # Event handling
    _interaction_callbacks = Instance(CallbackDispatcher, ())

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'interaction':
            self._interaction_callbacks(**content)

    def on_interaction(self, callback, remove=False):
        self._interaction_callbacks.register_callback(callback, remove=remove)
