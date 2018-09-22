from ipywidgets import (
    Widget, DOMWidget, Box, Color, CallbackDispatcher, widget_serialization,
    interactive
)

from traitlets import (
    Float, Unicode, Int, Tuple, List, Instance, Bool, Dict, Enum,
    link, observe, default, validate, TraitError
)

from traittypes import Dataset

from .xarray_ds import ds_x_to_json

from .basemaps import basemaps

from ._version import EXTENSION_VERSION

def_loc = [0.0, 0.0]


def basemap_to_tiles(bm, day='yesterday', **kwargs):
    # Format the URL with modisdate
    from datetime import date, timedelta
    if day == 'yesterday':
        yesterday = date.today() - timedelta(1)
        day = yesterday.strftime('%Y-%m-%d')
    url = bm.get('url', '')
    if url.count('%'):
        url = url % day
    return TileLayer(
        url=url,
        max_zoom=bm.get('max_zoom', 19),
        min_zoom=bm.get('min_zoom', 1),
        attribution=bm.get('attribution', ''),
        name=bm.get('name', ''),
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

    options = List(trait=Unicode).tag(sync=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]


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


class Marker(UILayer):
    _view_name = Unicode('LeafletMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletMarkerModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True)
    visible = Bool(True).tag(sync=True)
    icon = Instance(Icon, allow_none=True, default_value=None).tag(sync=True, **widget_serialization)

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
    max_width = Int(300).tag(sync=True, o=True)
    min_width = Int(50).tag(sync=True, o=True)
    max_height = Int(allow_none=True, default_value=None).tag(sync=True, o=True)
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
    tile_size = Int(256).tag(sync=True, o=True)
    attribution = Unicode('Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors').tag(sync=True, o=True)
    detect_retina = Bool(False).tag(sync=True, o=True)

    _load_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(TileLayer, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'load':
            self._load_callbacks(**content)

    def on_load(self, callback, remove=False):
        self._load_callbacks.register_callback(callback, remove=remove)


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
    crs = Unicode(allow_none=True, default_value=None).tag(sync=True, o=True)
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


class Velocity(Layer):
    _view_name = Unicode('LeafletVelocityView').tag(sync=True)
    _model_name = Unicode('LeafletVelocityModel').tag(sync=True)

    zonal_speed = Unicode('', help='Name of the zonal speed in the dataset')
    meridional_speed = Unicode('', help='Name of the meridional speed in the dataset')
    latitude_dimension = Unicode('latitude', help='Name of the latitude dimension in the dataset')
    longitude_dimension = Unicode('longitude', help='Name of the longitude dimension in the dataset')
    units = Unicode(None, allow_none=True)

    data = Dataset().tag(sync=True, to_json=ds_x_to_json)

    # Options
    display_values = Bool(True).tag(sync=True, o=True)
    display_options = Dict({
        'velocityType': 'Global Wind',
        'position': 'bottomleft',
        'emptyString': 'No velocity data',
        'angleConvention': 'bearingCW',
        'displayPosition': 'bottomleft',
        'displayEmptyString': 'No velocity data',
        'speedUnit': 'kt'
        }).tag(sync=True)
    min_velocity = Float(0).tag(sync=True,o=True)
    max_velocity = Float(10).tag(sync=True, o=True)
    velocity_scale = Float(0.005).tag(sync=True, o=True)
    color_scale = List([
        "rgb(36,104, 180)",
        "rgb(60,157, 194)",
        "rgb(128,205,193)",
        "rgb(151,218,168)",
        "rgb(198,231,181)",
        "rgb(238,247,217)",
        "rgb(255,238,159)",
        "rgb(252,217,125)",
        "rgb(255,182,100)",
        "rgb(252,150,75)",
        "rgb(250,112,52)",
        "rgb(245,64,32)",
        "rgb(237,45,28)",
        "rgb(220,24,32)",
        "rgb(180,0,35)"
        ]).tag(sync=True, o=True)


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
    fill_color = Color('#0033FF').tag(sync=True, o=True)
    fill_opacity = Float(0.2).tag(sync=True, o=True)
    dash_array = Unicode(allow_none=True, default_value=None).tag(sync=True, o=True)
    line_cap = Unicode('round').tag(sync=True, o=True)
    line_join = Unicode('round').tag(sync=True, o=True)
    pointer_events = Unicode('').tag(sync=True, o=True)
    class_name = Unicode('').tag(sync=True, o=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True, o=True)


class Polyline(Path):
    _view_name = Unicode('LeafletPolylineView').tag(sync=True)
    _model_name = Unicode('LeafletPolylineModel').tag(sync=True)

    locations = List().tag(sync=True)

    # Options
    smooth_factor = Float(1.0).tag(sync=True, o=True)
    no_clip = Bool(False).tag(sync=True, o=True)


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

    markers = Tuple(trait=Instance(Marker)).tag(sync=True, **widget_serialization)


class LayerGroup(Layer):
    _view_name = Unicode('LeafletLayerGroupView').tag(sync=True)
    _model_name = Unicode('LeafletLayerGroupModel').tag(sync=True)

    layers = Tuple(trait=Instance(Layer)).tag(sync=True, **widget_serialization)

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

    _click_callbacks = Instance(CallbackDispatcher, ())
    _hover_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(GeoJSON, self).__init__(**kwargs)
        self.on_msg(self._handle_m_msg)

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


class MultiPolygon(FeatureGroup):
    _view_name = Unicode('LeafletMultiPolygonView').tag(sync=True)
    _model_name = Unicode('LeafletMultiPolygonModel').tag(sync=True)

    locations = List().tag(sync=True)


class ControlException(TraitError):
    pass


class Control(Widget):
    _view_name = Unicode('LeafletControlView').tag(sync=True)
    _model_name = Unicode('LeafletControlModel').tag(sync=True)
    _view_module = Unicode('jupyter-leaflet').tag(sync=True)
    _model_module = Unicode('jupyter-leaflet').tag(sync=True)

    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    options = List(trait=Unicode).tag(sync=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]


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

    position = Enum(
        ['topright', 'topleft', 'bottomright', 'bottomleft'],
        default_value='topright',
        help="""Possible values are topleft, topright, bottomleft
                or bottomright"""
    ).tag(sync=True, o=True)

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

    left_layer = Instance(TileLayer).tag(sync=True, **widget_serialization)
    right_layer = Instance(TileLayer).tag(sync=True, **widget_serialization)

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


class Map(DOMWidget, InteractMixin):
    _view_name = Unicode('LeafletMapView').tag(sync=True)
    _model_name = Unicode('LeafletMapModel').tag(sync=True)
    _view_module = Unicode('jupyter-leaflet').tag(sync=True)
    _model_module = Unicode('jupyter-leaflet').tag(sync=True)

    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    # Map options
    center = List(def_loc).tag(sync=True, o=True)
    zoom_start = Int(12).tag(sync=True, o=True)
    zoom = Int(12).tag(sync=True, o=True)
    max_zoom = Int(18).tag(sync=True, o=True)
    min_zoom = Int(1).tag(sync=True, o=True)
    interpolation = Unicode('bilinear').tag(sync=True, o=True)

    # Specification of the basemap
    basemap = Dict(default_value=dict(
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            max_zoom=19,
            attribution='Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        )).tag(sync=True, o=True)
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
    zoom_control = Bool(True).tag(sync=True, o=True)
    attribution_control = Bool(True).tag(sync=True, o=True)
    # fade_animation = Bool(?).tag(sync=True, o=True)
    # zoom_animation = Bool(?).tag(sync=True, o=True)
    zoom_animation_threshold = Int(4).tag(sync=True, o=True)
    # marker_zoom_animation = Bool(?).tag(sync=True, o=True)

    options = List(trait=Unicode).tag(sync=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]

    south = Float(def_loc[0], read_only=True).tag(sync=True)
    north = Float(def_loc[0], read_only=True).tag(sync=True)
    east = Float(def_loc[1], read_only=True).tag(sync=True)
    west = Float(def_loc[1], read_only=True).tag(sync=True)

    layers = Tuple(trait=Instance(Layer)).tag(sync=True, **widget_serialization)

    @default('layers')
    def _default_layers(self):
        return (basemap_to_tiles(self.basemap, self.modisdate, base=True),)

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
        super(Map, self).__init__(**kwargs)
        self.on_displayed(self._fire_children_displayed)
        self.on_msg(self._handle_leaflet_event)

    def _fire_children_displayed(self, widget, **kwargs):
        for layer in self.layers:
            layer._handle_displayed(**kwargs)
        for control in self.controls:
            control._handle_displayed(**kwargs)

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

    controls = Tuple(trait=Instance(Control)).tag(sync=True, **widget_serialization)
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
