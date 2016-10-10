from ipywidgets import (
    Widget, DOMWidget, Box, Color, CallbackDispatcher, widget_serialization,
    Layout
)

from traitlets import (
    Float, Unicode, Int, Tuple, List, Instance, Bool, Dict, link, observe,
    default, validate, TraitError
)

# TODO: don't use private APIs
from ipywidgets.widgets.interaction import _widget_from_abbrev

def_loc = [0.0, 0.0]


class LayerException(TraitError):
    pass


class InteractMixin(object):

    def interact(self, **kwargs):
        c = []
        for name, abbrev in kwargs.items():
            default = getattr(self, name)
            widget = _widget_from_abbrev(abbrev, default)
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

    bottom = Bool().tag(sync=True)
    options = List(trait=Unicode).tag(sync=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]

    _map = None

    visible = Bool(False)

    @observe('visible')
    def _update_visible(self, change):
        # TODO: Consider replacing map.layers with sets. Then can simply add or subtract.
        was_visible = change['old']
        will_visible = change['new']
        if self._map is None:
            # If Map.add_layer has never been called raise
            raise LayerException('Map.add_layer() must be called first')
        else:
            if (not was_visible) and will_visible:
                # Only add if we aren't already in self._map.layers
                if self.model_id not in self._map.layer_ids:
                    self._map.layer_ids += [self.model_id]
                    self._map.layers += tuple([self])
            elif was_visible and (not will_visible):
                # Only remove if we are in self._map.layers
                if self.model_id in self._map.layer_ids:
                    self._map.layers = tuple([l for l in self._map.layers if l.model_id != self.model_id])
                    self._map.layer_ids = [l for l in self._map.layer_ids if l != self.model_id]


class UILayer(Layer):
    _view_name = Unicode('LeafletUILayerView').tag(sync=True)
    _model_name = Unicode('LeafletUILayerModel').tag(sync=True)


class Marker(UILayer):
    _view_name = Unicode('LeafletMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletMarkerModel').tag(sync=True)

    # read/write
    location = List(def_loc).tag(sync=True)
    z_index_offset = Int().tag(sync=True, o=True)
    opacity = Float(1.0).tag(sync=True, o=True)
    # write
    clickable = Bool(True).tag(sync=True, o=True)
    draggable = Bool(False).tag(sync=True, o=True)
    keyboard = Bool(True).tag(sync=True, o=True)
    title = Unicode().tag(sync=True, o=True)
    alt = Unicode().tag(sync=True, o=True)
    rise_on_hover = Bool(False).tag(sync=True, o=True)

    rise_offset = Int(250).tag(sync=True, o=True)


class Popup(UILayer):
    _view_name = Unicode('LeafletPopupView').tag(sync=True)
    _model_name = Unicode('LeafletPopupModel').tag(sync=True)


class RasterLayer(Layer):
    _view_name = Unicode('LeafletRasterLayerView').tag(sync=True)
    _model_name = Unicode('LeafletRasterLayerModel').tag(sync=True)


class TileLayer(RasterLayer):
    _view_name = Unicode('LeafletTileLayerView').tag(sync=True)
    _model_name = Unicode('LeafletTileLayerModel').tag(sync=True)

    bottom = Bool(True).tag(sync=True)
    url = Unicode('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').tag(sync=True)
    min_zoom = Int(0).tag(sync=True, o=True)
    max_zoom = Int(18).tag(sync=True, o=True)
    tile_size = Int(256).tag(sync=True, o=True)
    attribution = Unicode('Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors').tag(sync=True, o=True)
    opacity = Float(1.0).tag(sync=True, o=True)
    detect_retina = Bool(False).tag(sync=True, o=True)


class ImageOverlay(RasterLayer):
    _view_name = Unicode('LeafletImageOverlayView').tag(sync=True)
    _model_name = Unicode('LeafletImageOverlayModel').tag(sync=True)

    url = Unicode().tag(sync=True)
    bounds = List([def_loc, def_loc], help="SW and NE corners of the image").tag(sync=True)
    opacity = Float(1.0).tag(sync=True, o=True)
    attribution = Unicode().tag(sync=True, o=True)


class VectorLayer(Layer):
    _view_name = Unicode('LeafletVectorLayerView').tag(sync=True)
    _model_name = Unicode('LeafletVectorLayerModel').tag(sync=True)


class Path(VectorLayer):
    _view_name = Unicode('LeafletPathView').tag(sync=True)
    _model_name = Unicode('LeafletPathModel').tag(sync=True)

    stroke = Bool(True).tag(sync=True, o=True)
    color = Color('#0033FF').tag(sync=True, o=True)
    weight = Int(5).tag(sync=True, o=True)
    opacity = Float(0.5).tag(sync=True, o=True)
    fill = Bool(True).tag(sync=True, o=True)
    fill_color = Color('#0033FF').tag(sync=True, o=True)
    fill_opacity = Float(0.2).tag(sync=True, o=True)
    dash_array = Unicode().tag(sync=True, o=True)
    line_cap = Unicode().tag(sync=True, o=True)
    line_join = Unicode().tag(sync=True, o=True)
    clickable = Bool(True).tag(sync=True, o=True)
    pointer_events = Unicode().tag(sync=True, o=True)
    class_name = Unicode().tag(sync=True, o=True)


class Polyline(Path):
    _view_name = Unicode('LeafletPolylineView').tag(sync=True)
    _model_name = Unicode('LeafletPolylineModel').tag(sync=True)

    locations = List().tag(sync=True)
    smooth_factor = Float(1.0).tag(sync=True, o=True)
    no_clip = Bool(False).tag(sync=True, o=True)


class Polygon(Polyline):
    _view_name = Unicode('LeafletPolygonView').tag(sync=True)
    _model_name = Unicode('LeafletPolygonModel').tag(sync=True)


class Rectangle(Polygon):
    _view_name = Unicode('LeafletRectangleView').tag(sync=True)
    _model_name = Unicode('LeafletRectangleModel').tag(sync=True)

    bounds = List(help="list of SW and NE location tuples").tag(sync=True)


class Circle(Path):
    _view_name = Unicode('LeafletCircleView').tag(sync=True)
    _model_name = Unicode('LeafletCircleModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)
    radius = Int(1000, help="radius of circle in meters").tag(sync=True)


class CircleMarker(Circle):
    _view_name = Unicode('LeafletCircleMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletCircleMarkerModel').tag(sync=True)

    radius = Int(10, help="radius of circle in pixels").tag(sync=True)


class LayerGroup(Layer):
    _view_name = Unicode('LeafletLayerGroupView').tag(sync=True)
    _model_name = Unicode('LeafletLayerGroupModel').tag(sync=True)

    layers = List(Instance(Layer)).tag(sync=True, **widget_serialization)

    visible = Bool(False)
    @observe('visible')
    def _update_visible(self, change):
        # TODO: Consider replacing map.layers with sets. Then can simply add or subtract.
        was_visible = change['old']
        will_visible = change['new']
        if self._map is None:
            # If Map.add_layer has never been called raise
            raise LayerException('Map.add_layer() must be called first')
        else:
            if (not was_visible) and will_visible:
                # Only add if we aren't already in self._map.layers
                if self.model_id not in self._map.layer_ids:
                    self._map.layer_ids += [self.model_id]
                    self._map.layers += tuple(self.layers)
            elif was_visible and (not will_visible):
                # Only remove if we are in self._map.layers
                if self.model_id in self._map.layer_ids:
                    model_ids = [l.model_id for l in self.layers]
                    self._map.layers = tuple(l for l in self._map.layers if l.model_id not in model_ids)
                    self._map.layer_ids = [l for l in self._map.layer_ids if l !=  self.model_id]
    
    def add_layer(self, layer):
        '''Add layer to LayerGroup and update map'''
        
        self.layers += [layer]
        self._map.layer_ids += [layer.model_id]
        self._map.layers += tuple([layer])
        
        layer._map = self # The map for this layer is the layer group.
#         layer.visible = True

    def remove_layer(self, layer):
        '''Remove layer from LayerGroup and update map'''
        
        self.layers = [l for l in self.layers if l.model_id != layer.model_id]
        self._map.layers = tuple(l for l in self._map.layers if l.model_id != layer.model_id)
        self._map.layer_ids = [l for l in self._map.layer_ids]
        layer._map = None

    def clear_layers(self):
        '''Clear all layers from LayerGroup and update map'''
        
        model_ids = [l.model_id for l in self.layers]
        self._map.layers = (l for l in self._map.layers if l.model_id not in model_ids)
        self._map.layer_ids = [l for l in self._map.layer_ids if l !=  self.model_id]
        self.layers = ()
        

class FeatureGroup(Layer):
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
        """
        The click callback takes an unpacked set of keyword arguments.
        """
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_hover(self, callback, remove=False):
        """
        The hover callback takes an unpacked set of keyword arguments.
        """
        self._hover_callbacks.register_callback(callback, remove=remove)


class MultiPolyline(FeatureGroup):
    _view_name = Unicode('LeafletMultiPolylineView').tag(sync=True)
    _model_name = Unicode('LeafletMultiPolylineModel').tag(sync=True)


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

    options = List(trait=Unicode).tag(sync=True)

    @default('options')
    def _default_options(self):
        return [name for name in self.traits(o=True)]

    _map = None

    visible = Bool(False)

    @observe('visible')
    def _update_visible(self, change):
        was_visible = change['old']
        will_visible = change['new']
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
    _view_name = Unicode('LeafletDrawControlView').tag(sync=True)
    _model_name = Unicode('LeafletDrawControlModel').tag(sync=True)

    layer = Instance(FeatureGroup).tag(sync=True, **widget_serialization)

    @default('layer')
    def _default_layer(self):
        return FeatureGroup()
    # Enable each of the following drawing by giving them a non empty dict of options
    # You can add Leaflet style options in the shapeOptions sub-dict
    # See https://github.com/Leaflet/Leaflet.draw#polylineoptions

    # TODO: mutable default value!
    polyline = Dict({'shapeOptions':{}}).tag(sync=True)
    # See https://github.com/Leaflet/Leaflet.draw#polygonoptions
    # TODO: mutable default value!
    polygon = Dict({'shapeOptions':{}}).tag(sync=True)
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

        
class LayerControl(Control):
    _view_name = Unicode('LeafletLayerControlView').tag(sync=True)
    _model_name = Unicode('LeafletLayerControlModel').tag(sync=True)

    base_layers = List(Instance(Layer)).tag(sync=True, **widget_serialization)
    overlays = List(Instance(Layer)).tag(sync=True, **widget_serialization)



class Map(DOMWidget, InteractMixin):

    @default('layout')
    def _default_layout(self):
        return Layout(height='400px', align_self='stretch')

    _view_name = Unicode('LeafletMapView').tag(sync=True)
    _model_name = Unicode('LeafletMapModel').tag(sync=True)
    _view_module = Unicode('jupyter-leaflet').tag(sync=True)
    _model_module = Unicode('jupyter-leaflet').tag(sync=True)

    # Map options
    center = List(def_loc).tag(sync=True, o=True)
    zoom_start = Int(12).tag(sync=True, o=True)
    zoom = Int(12).tag(sync=True, o=True)
    max_zoom = Int(18).tag(sync=True, o=True)
    min_zoom = Int(1).tag(sync=True, o=True)
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

    _south = Float(def_loc[0]).tag(sync=True)
    _north = Float(def_loc[0]).tag(sync=True)
    _east = Float(def_loc[1]).tag(sync=True)
    _west = Float(def_loc[1]).tag(sync=True)

    default_tiles = Instance(TileLayer, allow_none=True)

    @default('default_tiles')
    def _default_tiles(self):
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
        return [(self.north, self.west),
                (self.north, self.east),
                (self.south, self.east),
                (self.south, self.west)]

    @property
    def bounds(self):
        return [(self.south, self.west),
                (self.north, self.east)]

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

    layers = Tuple(trait=Instance(Layer)).tag(sync=True, **widget_serialization)
    layer_ids = List()

    
    def add_layer(self, layer):
 
        layer._map = self
        layer.visible = True

    def remove_layer(self, layer):
       
        layer.visible = False
        layer._map = None

    def clear_layers(self):
        self.layers = ()

    controls = Tuple(trait=Instance(Control)).tag(sync=True, **widget_serialization)
    control_ids = List()

    @validate('controls')
    def _validate_controls(self, proposal):
        """Validate controls list.

        Makes sure only one instance of any given layer can exist in the
        controls list.
        """
        self.control_ids = [c.model_id for c in proposal['value']]
        if len(set(self.control_ids)) != len(self.control_ids):
            raise ControlException('duplicate control detected, only use each control once')
        return proposal['value']

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

