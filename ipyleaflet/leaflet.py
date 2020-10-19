# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

import copy
import asyncio
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
from shapely import geometry, wkt

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
    """Turn a basemap into a TileLayer object.

    Parameters
    ----------
    basemap : dict
        Basemap description coming from ipyleaflet.basemaps.
    day: string
        If relevant for the chosen basemap, you can specify the day for
        the tiles in the "%Y-%m-%d" format. Defaults to "yesterday".
    kwargs: key-word arguments
        Extra key-word arguments to pass to the TileLayer constructor.
    """
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


def wait_for_change(widget, value):
    future = asyncio.Future()

    def get_value(change):
        future.set_result(change.new)
        widget.unobserve(get_value, value)

    widget.observe(get_value, value)
    return future


class LayerException(TraitError):
    """Custom LayerException class."""
    pass


class InteractMixin(object):
    """Abstract InteractMixin class."""

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
    """Abstract Layer class.

    Base class for all layers in ipyleaflet.

    Attributes
    ----------
    name : string
        Custom name for the layer, which will be used by the LayersControl.
    popup: object
        Interactive widget that will be shown in a Popup when clicking on the layer.
    """

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
        """Add a click event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on click event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_dblclick(self, callback, remove=False):
        """Add a double-click event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on double-click event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._dblclick_callbacks.register_callback(callback, remove=remove)

    def on_mousedown(self, callback, remove=False):
        """Add a mouse-down event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on mouse-down event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._mousedown_callbacks.register_callback(callback, remove=remove)

    def on_mouseup(self, callback, remove=False):
        """Add a mouse-up event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on mouse-up event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._mouseup_callbacks.register_callback(callback, remove=remove)

    def on_mouseover(self, callback, remove=False):
        """Add a mouse-over event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on mouse-over event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._mouseover_callbacks.register_callback(callback, remove=remove)

    def on_mouseout(self, callback, remove=False):
        """Add a mouse-out event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on mouse-out event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._mouseout_callbacks.register_callback(callback, remove=remove)


class UILayer(Layer):
    """Abstract UILayer class."""

    _view_name = Unicode('LeafletUILayerView').tag(sync=True)
    _model_name = Unicode('LeafletUILayerModel').tag(sync=True)


class Icon(UILayer):
    """Icon class.

    Custom icon used for markers.

    Attributes
    ----------
    icon_url : string
        The url to the image used for the icon.
    shadow_url: string, default None
        The url to the image used for the icon shadow.
    icon_size: tuple, default None
        The size of the icon, in pixels.
    shadow_size: tuple, default None
        The size of the icon shadow, in pixels.
    icon_anchor: tuple, default None
        The coordinates of the "tip" of the icon (relative to its top left corner).
        The icon will be aligned so that this point is at the marker's geographical
        location. Centered by default if icon_size is specified.
    shadow_anchor: tuple, default None
        The coordinates of the "tip" of the shadow (relative to its top left corner).
        The same as icon_anchor if None.
    popup_anchor: tuple, default None
        The coordinates of the point from which popups will "open", relative to the
        icon anchor.
    """

    _view_name = Unicode('LeafletIconView').tag(sync=True)
    _model_name = Unicode('LeafletIconModel').tag(sync=True)

    icon_url = Unicode('').tag(sync=True, o=True)
    shadow_url = Unicode(None, allow_none=True).tag(sync=True, o=True)
    icon_size = List(default_value=None, allow_none=True).tag(sync=True, o=True)
    shadow_size = List(default_value=None, allow_none=True).tag(sync=True, o=True)
    icon_anchor = List(default_value=None, allow_none=True).tag(sync=True, o=True)
    shadow_anchor = List(default_value=None, allow_none=True).tag(sync=True, o=True)
    popup_anchor = List([0, 0], allow_none=True).tag(sync=True, o=True)

    @validate('icon_size', 'shadow_size', 'icon_anchor', 'shadow_anchor', 'popup_anchor')
    def _validate_attr(self, proposal):
        value = proposal['value']

        # Workaround Traitlets which does not respect the None default value
        if value is None or len(value) == 0:
            return None

        if len(value) != 2:
            raise TraitError('The value should be of size 2, but {} was given'.format(value))

        return value


class DivIcon(UILayer):
    """DivIcon class.

    Custom lightweight icon for markers that uses a simple <div> element
    instead of an image used for markers.

    Attributes
    ----------
    html : string
        Custom HTML code to put inside the div element,
        empty by default.
    bg_pos : tuple, default [0, 0]
        Optional relative position of the background, in pixels.
    icon_size: tuple, default None
        The size of the icon, in pixels.
    icon_anchor: tuple, default None
        The coordinates of the "tip" of the icon (relative to its top left corner).
        The icon will be aligned so that this point is at the marker's geographical
        location. Centered by default if icon_size is specified.
    popup_anchor: tuple, default None
        The coordinates of the point from which popups will "open", relative to the
        icon anchor.
    """

    _view_name = Unicode('LeafletDivIconView').tag(sync=True)
    _model_name = Unicode('LeafletDivIconModel').tag(sync=True)

    html = Unicode('').tag(sync=True, o=True)
    bg_pos = List([0, 0], allow_none=True).tag(sync=True, o=True)
    icon_size = List(default_value=None, allow_none=True).tag(sync=True, o=True)
    icon_anchor = List(default_value=None, allow_none=True).tag(sync=True, o=True)
    popup_anchor = List([0, 0], allow_none=True).tag(sync=True, o=True)

    @validate('icon_size', 'icon_anchor', 'popup_anchor')
    def _validate_attr(self, proposal):
        value = proposal['value']

        # Workaround Traitlets which does not respect the None default value
        if value is None or len(value) == 0:
            return None

        if len(value) != 2:
            raise TraitError('The value should be of size 2, but {} was given'.format(value))

        return value


class AwesomeIcon(UILayer):
    """AwesomeIcon class.

    FontAwesome icon used for markers.

    Attributes
    ----------
    name : string, default "home"
        The name of the FontAwesome icon to use.
        See https://fontawesome.com/v4.7.0/icons for available icons.
    marker_color: string, default "blue"
        Color used for the icon background.
    icon_color: string, default "white"
        CSS color used for the FontAwesome icon.
    spin: boolean, default False
        Whether the icon is spinning or not.
    """

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
    """Marker class.

    Clickable/Draggable marker on the map.

    Attributes
    ----------
    location: tuple, default (0, 0)
        The tuple containing the latitude/longitude of the marker.
    opacity: float, default 1.
        Opacity of the marker between 0. (fully transparent) and 1. (fully opaque).
    visible: boolean, default True
        Whether the marker is visible or not.
    icon: object, default None
        Icon used for the marker, it can be an Icon or an AwesomeIcon instance.
        By default it will use a blue icon.
    draggable: boolean, default True
        Whether the marker is draggable with the mouse or not.
    keyboard: boolean, default True
        Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
    title: string, default ''
        Text for the browser tooltip that appear on marker hover (no tooltip by default).
    alt: string, default ''
        Text for the alt attribute of the icon image (useful for accessibility).
    rotation_angle: float, default 0.
        The rotation angle of the marker in degrees.
    rotation_origin: string, default ''
        The rotation origin of the marker.
    """

    _view_name = Unicode('LeafletMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletMarkerModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True)
    visible = Bool(True).tag(sync=True)
    icon = Union((Instance(Icon), Instance(AwesomeIcon), Instance(DivIcon)), allow_none=True, default_value=None).tag(sync=True, **widget_serialization)

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
        """Add a move event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on move event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._move_callbacks.register_callback(callback, remove=remove)


class Popup(UILayer):
    """Popup class.

    Popup element that can be placed on the map.

    Attributes
    ----------
    location: tuple, default (0, 0)
        The tuple containing the latitude/longitude of the popup.
    child: object, default None
        Child widget that the Popup will contain.
    min_width: int, default 50
        Minimum width of the Popup.
    max_width: int, default 300
        Maximum width of the Popup.
    max_height: int, default None
        Maximum height of the Popup.
    auto_pan: boolean, default True
        Set it to False if you don’t want the map to do panning
        animation to fit the opened popup.
    keep_in_view: boolean, default False
        Set it to True if you want to prevent users from panning
        the popup off of the screen while it is open.
    close_button: boolean, default True
        Whether to show a close button or not.
    auto_close: boolean, default True
        Whether to automatically close the popup when interacting
        with another element of the map or not.
    close_on_escape_key: boolean, default True
        Whether to close the popup when clicking the escape key or not.
    """

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


class RasterLayer(Layer):
    """Abstract RasterLayer class.

    Attributes
    ----------
    opacity: float, default 1.
        Opacity of the layer between 0. (fully transparent) and 1. (fully opaque).
    visible: boolean, default True
        Whether the layer is visible or not.
    """

    _view_name = Unicode('LeafletRasterLayerView').tag(sync=True)
    _model_name = Unicode('LeafletRasterLayerModel').tag(sync=True)

    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True)
    visible = Bool(True).tag(sync=True)


class TileLayer(RasterLayer):
    """TileLayer class.

    Tile service layer.

    Attributes
    ----------
    url: string, default "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        Url to the tiles service.
    min_zoom: int, default 0
        Minimum zoom for this tile service.
    max_zoom: int, default 18
        Maximum zoom for this tile service.
    tile_size int, default 256
        Tile sizes for this tile service.
    attribution string, default "Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors"
        Tiles service attribution.
    no_wrap boolean, default False
        Whether the layer is wrapped around the antimeridian.
    tms: boolean, default False
        If true, inverses Y axis numbering for tiles (turn this on for TMS services).
    show_loading: boolean, default False
        Whether to show a spinner when tiles are loading.
    loading: boolean, default False
        Whether the tiles are currently loading.
    """

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
        """Add a load event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called when the tiles have finished loading.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._load_callbacks.register_callback(callback, remove=remove)

    def redraw(self):
        """Force redrawing the tiles.

        This is especially useful when you are sure the server updated the tiles and you
        need to refresh the layer.
        """
        self.send({'msg': 'redraw'})


class LocalTileLayer(TileLayer):
    """LocalTileLayer class.

    Custom tile layer using local tile files.

    Attributes
    ----------
    path: string, default ""
        Path to your local tiles. In the classic Jupyter Notebook, the path is relative to
        the Notebook you are working on. In JupyterLab, the path is relative to the server
        (where you started JupyterLab) and you need to prefix the path with “files/”.
    """

    _view_name = Unicode('LeafletLocalTileLayerView').tag(sync=True)
    _model_name = Unicode('LeafletLocalTileLayerModel').tag(sync=True)

    path = Unicode('').tag(sync=True)


class WMSLayer(TileLayer):
    """WMSLayer class.

    Attributes
    ----------
    layers: string, default ""
        Comma-separated list of WMS layers to show.
    styles: string, default ""
        Comma-separated list of WMS styles
    format: string, default "image/jpeg"
        WMS image format (use `'image/png'` for layers with transparency).
    transparent: boolean, default False
        If true, the WMS service will return images with transparency.
    crs: dict, default ipyleaflet.projections.EPSG3857
        Projection used for this WMS service.
    """

    _view_name = Unicode('LeafletWMSLayerView').tag(sync=True)
    _model_name = Unicode('LeafletWMSLayerModel').tag(sync=True)

    # Options
    layers = Unicode().tag(sync=True, o=True)
    styles = Unicode().tag(sync=True, o=True)
    format = Unicode('image/jpeg').tag(sync=True, o=True)
    transparent = Bool(False).tag(sync=True, o=True)
    crs = Dict(default_value=projections.EPSG3857).tag(sync=True)
    uppercase = Bool(False).tag(sync=True, o=True)


class MagnifyingGlass(RasterLayer):
    """MagnifyingGlass class.

    Attributes
    ----------
    radius: int, default 100
        The radius of the magnifying glass, in pixels.
    zoom_offset: int, default 3
        The zoom level offset between the main map zoom and the magnifying glass.
    fixed_zoom: int, default -1
        If different than -1, defines a fixed zoom level to always use in the magnifying glass,
        ignoring the main map zoom and the zoomOffet value.
    fixed_position: boolean, default False
        If True, the magnifying glass will stay at the same position on the map,
        not following the mouse cursor.
    lat_lng: list, default [0, 0]
        The initial position of the magnifying glass, both on the main map and as the center
        of the magnified view. If fixed_position is True, it will always keep this position.
    layers: list, default []
        Set of layers to display in the magnified view.
        These layers shouldn't be already added to a map instance.
    """

    _view_name = Unicode('LeafletMagnifyingGlassView').tag(sync=True)
    _model_name = Unicode('LeafletMagnifyingGlassModel').tag(sync=True)

    # Options
    radius = Int(100).tag(sync=True, o=True)
    zoom_offset = Int(3).tag(sync=True, o=True)
    fixed_zoom = Int(-1).tag(sync=True, o=True)
    fixed_position = Bool(False).tag(sync=True, o=True)
    lat_lng = List(def_loc).tag(sync=True, o=True)
    layers = Tuple().tag(trait=Instance(Layer), sync=True, o=True, **widget_serialization)

    _layer_ids = List()

    @validate('layers')
    def _validate_layers(self, proposal):
        '''Validate layers list.

        Makes sure only one instance of any given layer can exist in the
        layers list.
        '''
        self._layer_ids = [layer.model_id for layer in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise LayerException('duplicate layer detected, only use each layer once')
        return proposal.value


class ImageOverlay(RasterLayer):
    """ImageOverlay class.

    Image layer from a local or remote image file.

    Attributes
    ----------
    url: string, default ""
        Url to the local or remote image file.
    bounds: list, default [0., 0]
        SW and NE corners of the image.
    attribution: string, default ""
        Image attribution.
    """

    _view_name = Unicode('LeafletImageOverlayView').tag(sync=True)
    _model_name = Unicode('LeafletImageOverlayModel').tag(sync=True)

    url = Unicode().tag(sync=True)
    bounds = List([def_loc, def_loc], help='SW and NE corners of the image').tag(sync=True)

    # Options
    attribution = Unicode().tag(sync=True, o=True)


class VideoOverlay(RasterLayer):
    """VideoOverlay class.

    Video layer from a local or remote video file.

    Attributes
    ----------
    url: string, default ""
        Url to the local or remote video file.
    bounds: list, default [0., 0]
        SW and NE corners of the video.
    attribution: string, default ""
        Video attribution.
    """

    _view_name = Unicode('LeafletVideoOverlayView').tag(sync=True)
    _model_name = Unicode('LeafletVideoOverlayModel').tag(sync=True)

    url = Unicode().tag(sync=True)
    bounds = List([def_loc, def_loc], help='SW and NE corners of the image').tag(sync=True)

    # Options
    attribution = Unicode().tag(sync=True, o=True)


class Heatmap(RasterLayer):
    """Heatmap class.

    Heatmap layer.

    Attributes
    ----------
    locations: list, default []
        List of data points locations for generating the heatmap.
    radius: float, default 25.
        Radius of the data points.
    blur: float, default 15.
        Blurring intensity.
    gradient: dict, default {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}
        Colors used for the color-mapping from low to high heatmap intensity.
    """

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
    """VectorTileLayer class.

    Vector tile layer.

    Attributes
    ----------
    url: string, default ""
        Url to the vector tile service.
    attribution: string, default ""
        Vector tile service attribution.
    vector_tile_layer_styles: dict, default {}
        CSS Styles to apply to the vector data.
    """

    _view_name = Unicode('LeafletVectorTileLayerView').tag(sync=True)
    _model_name = Unicode('LeafletVectorTileLayerModel').tag(sync=True)

    url = Unicode().tag(sync=True, o=True)
    attribution = Unicode().tag(sync=True, o=True)

    vector_tile_layer_styles = Dict().tag(sync=True, o=True)

    def redraw(self):
        """Force redrawing the tiles.

        This is especially useful when you are sure the server updated the tiles and you
        need to refresh the layer.
        """
        self.send({'msg': 'redraw'})


class VectorLayer(Layer):
    """VectorLayer abstract class."""

    _view_name = Unicode('LeafletVectorLayerView').tag(sync=True)
    _model_name = Unicode('LeafletVectorLayerModel').tag(sync=True)


class Path(VectorLayer):
    """Path abstract class.

    Path layer.

    Attributes
    ----------
    stroke: boolean, default True
        Whether to draw a stroke.
    color: CSS color, default '#0033FF'
        CSS color.
    weight: int, default 5
        Weight of the stroke.
    fill: boolean, default True
        Whether to fill the path with a flat color.
    fill_color: CSS color, default None
        Color used for filling the path shape. If None, the color attribute
        value is used.
    fill_opacity: float, default 0.2
        Opacity used for filling the path shape.
    line_cap: string, default "round"
        A string that defines shape to be used at the end of the stroke.
        Possible values are 'round', 'butt' or 'square'.
    line_join: string, default "round"
        A string that defines shape to be used at the corners of the stroke.
        Possible values are 'arcs', 'bevel', 'miter', 'miter-clip' or 'round'.
    """

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
    line_cap = Enum(values=['round', 'butt', 'square'], default_value='round').tag(sync=True, o=True)
    line_join = Enum(values=['arcs', 'bevel', 'miter', 'miter-clip', 'round'], default_value='round').tag(sync=True, o=True)
    pointer_events = Unicode('').tag(sync=True, o=True)
    opacity = Float(1.0, min=0.0, max=1.0).tag(sync=True, o=True)


class AntPath(VectorLayer):
    """AntPath class.

    AntPath layer.

    Attributes
    ----------
    locations: list, default []
        Locations through which the ant-path is going.
    use: string, default 'polyline'
        Type of shape to use for the ant-path. Possible values are 'polyline', 'polygon',
        'rectangle' and 'circle'.
    delay: int, default 400
        Add a delay to the animation flux.
    weight: int, default 5
        Weight of the ant-path.
    dash_array: list, default [10, 20]
        The sizes of the animated dashes.
    color: CSS color, default '#0000FF'
        The color of the primary dashes.
    pulse_color: CSS color, default '#FFFFFF'
        The color of the secondary dashes.
    paused: boolean, default False
        Whether the animation is running or not.
    reverse: boolean, default False
        Whether the animation is going backwards or not.
    hardware_accelerated: boolean, default False
        Whether the ant-path uses hardware acceleration.
    """

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
    """Polyline abstract class.

    Attributes
    ----------
    locations: list, default []
        Locations defining the shape.
    scaling: boolean, default True
        Whether you can edit the scale of the shape or not.
    rotation: boolean, default True
        Whether you can rotate the shape or not.
    uniform_scaling: boolean, default False
        Whether to keep the size ratio when changing the shape scale.
    smooth_factor: float, default 1.
        Smoothing intensity.
    transform: boolean, default False
        Whether the shape is editable or not.
    draggable: boolean, default False
        Whether you can drag the shape on the map or not.
    """

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
    """Polygon class.

    Polygon layer.
    """

    _view_name = Unicode('LeafletPolygonView').tag(sync=True)
    _model_name = Unicode('LeafletPolygonModel').tag(sync=True)


class Rectangle(Polygon):
    """Rectangle class.

    Rectangle layer.

    Attributes
    ----------
    bounds: list, default []
        List of SW and NE location tuples. e.g. [(50, 75), (75, 120)].
    """

    _view_name = Unicode('LeafletRectangleView').tag(sync=True)
    _model_name = Unicode('LeafletRectangleModel').tag(sync=True)

    bounds = List(help='list of SW and NE location tuples').tag(sync=True)


class CircleMarker(Path):
    """CircleMarker class.

    CircleMarker layer.

    Attributes
    ----------
    location: list, default [0, 0]
        Location of the marker (lat, long).
    radius: int, default 10
        Radius of the circle marker in pixels.
    """

    _view_name = Unicode('LeafletCircleMarkerView').tag(sync=True)
    _model_name = Unicode('LeafletCircleMarkerModel').tag(sync=True)

    location = List(def_loc).tag(sync=True)

    # Options
    radius = Int(10, help='radius of circle in pixels').tag(sync=True, o=True)


class Circle(CircleMarker):
    """Circle class.

    Circle layer.

    Attributes
    ----------
    radius: int, default 1000
        Radius of the circle marker in meters.
    """

    _view_name = Unicode('LeafletCircleView').tag(sync=True)
    _model_name = Unicode('LeafletCircleModel').tag(sync=True)

    # Options
    radius = Int(1000, help='radius of circle in meters').tag(sync=True, o=True)


class MarkerCluster(Layer):
    """MarkerCluster class.

    A cluster of markers that you can put on the map like other layers.

    Attributes
    ----------
    markers: list, default []
        List of markers to include in the cluster.
    """

    _view_name = Unicode('LeafletMarkerClusterView').tag(sync=True)
    _model_name = Unicode('LeafletMarkerClusterModel').tag(sync=True)

    markers = Tuple().tag(trait=Instance(Marker), sync=True, **widget_serialization)


class LayerGroup(Layer):
    """LayerGroup class.

    A group of layers that you can put on the map like other layers.

    Attributes
    ----------
    layers: list, default []
        List of layers to include in the group.
    """

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
        self._layer_ids = [layer.model_id for layer in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise LayerException('duplicate layer detected, only use each layer once')
        return proposal.value

    def add_layer(self, layer):
        """Add a new layer to the group.

        Parameters
        ----------
        layer: layer instance
            The new layer to include in the group.
        """
        if isinstance(layer, dict):
            layer = basemap_to_tiles(layer)
        if layer.model_id in self._layer_ids:
            raise LayerException('layer already in layergroup: %r' % layer)
        self.layers = tuple([layer for layer in self.layers] + [layer])

    def remove_layer(self, rm_layer):
        """Remove a layer from the group.

        Parameters
        ----------
        layer: layer instance
            The layer to remove from the group.
        """
        if rm_layer.model_id not in self._layer_ids:
            raise LayerException('layer not on in layergroup: %r' % rm_layer)
        self.layers = tuple([layer for layer in self.layers if layer.model_id != rm_layer.model_id])

    def substitute_layer(self, old, new):
        """Substitute a layer with another one in the group.

        Parameters
        ----------
        old: layer instance
            The layer to remove from the group.
        new: layer instance
            The new layer to include in the group.
        """
        if isinstance(new, dict):
            new = basemap_to_tiles(new)
        if old.model_id not in self._layer_ids:
            raise LayerException('Could not substitute layer: layer not in layergroup.')
        self.layers = tuple([new if layer.model_id == old.model_id else layer for layer in self.layers])

    def clear_layers(self):
        """Remove all layers from the group."""
        self.layers = ()


class FeatureGroup(LayerGroup):
    """FeatureGroup abstract class."""

    _view_name = Unicode('LeafletFeatureGroupView').tag(sync=True)
    _model_name = Unicode('LeafletFeatureGroupModel').tag(sync=True)


class GeoJSON(FeatureGroup):
    """GeoJSON class.

    Layer created from a GeoJSON data structure.

    Attributes
    ----------
    data: dict, default {}
        The JSON data structure.
    style: dict, default {}
        Extra style to apply to the features.
    hover_style: dict, default {}
        Style that will be applied to a feature when the mouse is over this feature.
    point_style: dict, default {}
        Extra style to apply to the point features.
    style_callback: callable, default None
        Function that will be called for each feature, should take the feature as
        input and return the feature style.
    """

    _view_name = Unicode('LeafletGeoJSONView').tag(sync=True)
    _model_name = Unicode('LeafletGeoJSONModel').tag(sync=True)

    data = Dict().tag(sync=True)
    style = Dict().tag(sync=True)
    hover_style = Dict().tag(sync=True)
    point_style = Dict().tag(sync=True)
    style_callback = Any()

    _click_callbacks = Instance(CallbackDispatcher, ())
    _hover_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        self.updating = True

        super(GeoJSON, self).__init__(**kwargs)

        self.data = self._get_data()
        self.updating = False

    @validate('style_callback')
    def _validate_style_callback(self, proposal):
        if not callable(proposal.value):
            raise TraitError('style_callback should be callable (functor/function/lambda)')
        return proposal.value

    @observe('data', 'style', 'style_callback')
    def _update_data(self, change):
        if self.updating:
            return

        self.updating = True
        self.data = self._get_data()
        self.updating = False

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

        # We need to make a deep copy for ipywidgets to see the change
        data = copy.deepcopy(self.data)

        if datatype == 'Feature':
            self._apply_style(data, style_callback)
        elif datatype == 'FeatureCollection':
            for feature in data['features']:
                self._apply_style(feature, style_callback)

        return data

    @property
    def __geo_interface__(self):
        """
        Return a dict whose structure aligns to the GeoJSON format
        For more information about the ``__geo_interface__``, see
        https://gist.github.com/sgillies/2217756
        """

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

    def _handle_mouse_events(self, _, content, buffers):
        if content.get('event', '') == 'click':
            self._click_callbacks(**content)
        if content.get('event', '') == 'mouseover':
            self._hover_callbacks(**content)

    def on_click(self, callback, remove=False):
        """Add a feature click event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on click event on a feature, this function
            should take the event and the feature as inputs.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_hover(self, callback, remove=False):
        """Add a feature hover event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called when the mouse is over a feature, this function
            should take the event and the feature as inputs.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._hover_callbacks.register_callback(callback, remove=remove)


class GeoData(GeoJSON):
    """GeoData class.

    Layer created from a GeoPandas dataframe.

    Attributes
    ----------
    geo_dataframe: geopandas.GeoDataFrame instance, default None
        The GeoPandas dataframe to use.
    """

    geo_dataframe = Instance('geopandas.GeoDataFrame')

    def __init__(self, **kwargs):
        super(GeoData, self).__init__(**kwargs)
        self.data = self._get_data()

    @observe('geo_dataframe', 'style', 'style_callback')
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        return json.loads(self.geo_dataframe.to_json())

    @property
    def __geo_interface__(self):
        """
        Return a dict whose structure aligns to the GeoJSON format
        For more information about the ``__geo_interface__``, see
        https://gist.github.com/sgillies/2217756
        """

        return self.geo_dataframe.__geo_interface__


class Choropleth(GeoJSON):
    """Choropleth class.

    Layer showing a Choropleth effect on a GeoJSON structure.

    Attributes
    ----------
    geo_data: dict, default None
        The GeoJSON structure on which to apply the Choropleth effect.
    choro_data: dict, default None
        Data used for building the Choropleth effect.
    value_min: float, default None
        Minimum data value for the color mapping.
    value_max: float, default None
        Maximum data value for the color mapping.
    colormap: branca.colormap.ColorMap instance, default None
        The colormap used for the effect.
    key_on: string, default "id"
        The feature key to use for the colormap effect.
    """

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


class WKTLayer(GeoJSON):
    """WKTLayer class.

    Layer created from a local WKT file or WKT string input.

    Attributes
    ----------
    path: string, default ""
      file path of local WKT file.
    wkt_string: string, default ""
      WKT string.
    """

    path = Unicode('')
    wkt_string = Unicode('')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.data = self._get_data()

    @observe('path', 'wkt_string', 'style', 'style_callback')
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        if self.path:
            with open(self.path) as f:
                parsed_wkt = wkt.load(f)
        elif self.wkt_string:
            parsed_wkt = wkt.loads(self.wkt_string)
        else:
            raise ValueError("Please provide either WKT file path or WKT string")

        geo = geometry.mapping(parsed_wkt)
        if geo["type"] == "GeometryCollection":
            features = [{"geometry": g, "properties": {}, "type": "Feature"} for g in geo["geometries"]]
            feature_collection = {"type": "FeatureCollection", "features": features}
            return feature_collection
        else:
            feature = {"geometry": geo, "properties": {}, "type": "Feature"}
            return feature


class ControlException(TraitError):
    """Custom LayerException class."""
    pass


class Control(Widget):
    """Control abstract class.

    This is the base class for all ipyleaflet controls. A control is additional
    UI components on top of the Map.

    Attributes
    ----------
    position: str, default 'topleft'
        The position of the control. Possible values are 'topright',
        'topleft', 'bottomright' and 'bottomleft'.
    """

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
    """WidgetControl class.

    A control that contain any DOMWidget instance.

    Attributes
    ----------
    widget: DOMWidget
        The widget to put inside of the control. It can be any widget, even coming from
        a third-party library like bqplot.
    """

    _view_name = Unicode('LeafletWidgetControlView').tag(sync=True)
    _model_name = Unicode('LeafletWidgetControlModel').tag(sync=True)

    widget = Instance(DOMWidget).tag(sync=True, **widget_serialization)

    max_width = Int(default_value=None, allow_none=True).tag(sync=True)
    min_width = Int(default_value=None, allow_none=True).tag(sync=True)
    max_height = Int(default_value=None, allow_none=True).tag(sync=True)
    min_height = Int(default_value=None, allow_none=True).tag(sync=True)

    transparent_bg = Bool(False).tag(sync=True, o=True)


class FullScreenControl(Control):
    """FullScreenControl class.

    A control which contains a button that will put the Map in
    full-screen when clicked.
    """

    _view_name = Unicode('LeafletFullScreenControlView').tag(sync=True)
    _model_name = Unicode('LeafletFullScreenControlModel').tag(sync=True)


class LayersControl(Control):
    """LayersControl class.

    A control which allows hiding/showing different layers on the Map.
    """

    _view_name = Unicode('LeafletLayersControlView').tag(sync=True)
    _model_name = Unicode('LeafletLayersControlModel').tag(sync=True)


class MeasureControl(Control):
    """MeasureControl class.

    A control which allows making measurements on the Map.

    Attributes
    ----------
    primary_length_unit: str, default 'feet'
        Possible values are 'feet', 'meters', 'miles', 'kilometers' or any user
        defined unit.
    secondary_length_unit: str, default None
        Possible values are 'feet', 'meters', 'miles', 'kilometers' or any user
        defined unit.
    primary_area_unit: str, default 'acres'
        Possible values are 'acres', 'hectares', 'sqfeet', 'sqmeters', 'sqmiles'
        or any user defined unit.
    secondary_area_unit: str, default None
        Possible values are 'acres', 'hectares', 'sqfeet', 'sqmeters', 'sqmiles'
        or any user defined unit.
    active_color: CSS Color, default '#ABE67E'
        The color used for current measurements.
    completed_color: CSS Color, default '#C8F2BE'
        The color used for the completed measurements.
    """

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
        """Add a custom length unit.

        Parameters
        ----------
        name: str
            The name for your custom unit.
        factor: float
            Factor to apply when converting to this unit. Length in meters
            will be multiplied by this factor.
        decimals: int, default 0
            Number of decimals to round results when using this unit.
        """
        self._length_units.append(name)
        self._add_unit(name, factor, decimals)

    def add_area_unit(self, name, factor, decimals=0):
        """Add a custom area unit.

        Parameters
        ----------
        name: str
            The name for your custom unit.
        factor: float
            Factor to apply when converting to this unit. Area in sqmeters
            will be multiplied by this factor.
        decimals: int, default 0
            Number of decimals to round results when using this unit.
        """
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
    """SplitMapControl class.

    A control which allows comparing layers by splitting the map in two.

    Attributes
    ----------
    left_layer: Layer or list of Layers
        The left layer(s) for comparison.
    right_layer: Layer or list of Layers
        The right layer(s) for comparison.
    """

    _view_name = Unicode('LeafletSplitMapControlView').tag(sync=True)
    _model_name = Unicode('LeafletSplitMapControlModel').tag(sync=True)

    left_layer = Union((Instance(Layer), List(Instance(Layer)))).tag(sync=True, **widget_serialization)
    right_layer = Union((Instance(Layer), List(Instance(Layer)))).tag(sync=True, **widget_serialization)

    @default('left_layer')
    def _default_left_layer(self):
        # TODO: Shouldn't this be None?
        return TileLayer()

    @default('right_layer')
    def _default_right_layer(self):
        # TODO: Shouldn't this be None?
        return TileLayer()

    def __init__(self, **kwargs):
        super(SplitMapControl, self).__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'dividermove':
            event = content.get('event')
            # TODO: Add x trait?
            self.x = event.x


class DrawControl(Control):
    """DrawControl class.

    Drawing tools for drawing on the map.
    """

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
        """Add a draw event listener.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on draw event.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._draw_callbacks.register_callback(callback, remove=remove)

    def clear(self):
        """Clear all drawings."""
        self.send({'msg': 'clear'})

    def clear_polylines(self):
        """Clear all polylines."""
        self.send({'msg': 'clear_polylines'})

    def clear_polygons(self):
        """Clear all polygons."""
        self.send({'msg': 'clear_polygons'})

    def clear_circles(self):
        """Clear all circles."""
        self.send({'msg': 'clear_circles'})

    def clear_circle_markers(self):
        """Clear all circle markers."""
        self.send({'msg': 'clear_circle_markers'})

    def clear_rectangles(self):
        """Clear all rectangles."""
        self.send({'msg': 'clear_rectangles'})

    def clear_markers(self):
        """Clear all markers."""
        self.send({'msg': 'clear_markers'})


class ZoomControl(Control):
    """ZoomControl class.

    A control which contains buttons for zooming in/out the Map.

    Attributes
    ----------
    zoom_in_text: str, default '+'
        Text to put in the zoom-in button.
    zoom_in_title: str, default 'Zoom in'
        Title to put in the zoom-in button, this is shown when the mouse
        is over the button.
    zoom_out_text: str, default '-'
        Text to put in the zoom-out button.
    zoom_out_title: str, default 'Zoom out'
        Title to put in the zoom-out button, this is shown when the mouse
        is over the button.
    """

    _view_name = Unicode('LeafletZoomControlView').tag(sync=True)
    _model_name = Unicode('LeafletZoomControlModel').tag(sync=True)

    zoom_in_text = Unicode('+').tag(sync=True, o=True)
    zoom_in_title = Unicode('Zoom in').tag(sync=True, o=True)
    zoom_out_text = Unicode('-').tag(sync=True, o=True)
    zoom_out_title = Unicode('Zoom out').tag(sync=True, o=True)


class ScaleControl(Control):
    """ScaleControl class.

    A control which shows the Map scale.

    Attributes
    ----------
    max_width: int, default 100
        Max width of the control, in pixels.
    metric: bool, default True
        Whether to show metric units.
    imperial: bool, default True
        Whether to show imperial units.
    """

    _view_name = Unicode('LeafletScaleControlView').tag(sync=True)
    _model_name = Unicode('LeafletScaleControlModel').tag(sync=True)

    max_width = Int(100).tag(sync=True, o=True)
    metric = Bool(True).tag(sync=True, o=True)
    imperial = Bool(True).tag(sync=True, o=True)
    update_when_idle = Bool(False).tag(sync=True, o=True)


class AttributionControl(Control):
    """AttributionControl class.

    A control which contains the layers attribution.
    """

    _view_name = Unicode('LeafletAttributionControlView').tag(sync=True)
    _model_name = Unicode('LeafletAttributionControlModel').tag(sync=True)

    prefix = Unicode('ipyleaflet').tag(sync=True, o=True)


class LegendControl(Control):
    """LegendControl class.

    A control which contains a legend.

    Attributes
    ----------
    title: str, default 'Legend'
        The title of the legend.
    legend: dict, default 'Legend'
        A dictionary containing names as keys and CSS colors as values.
    """

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
        """Add a new legend element.

        Parameters
        ----------
        key: str
            The key for the legend element.
        value: CSS Color
            The value for the legend element.
        """
        self.legend[key] = value
        self.send_state()

    def remove_legend_element(self, key):
        """Remove a legend element.

        Parameters
        ----------
        key: str
            The element to remove.
        """
        del self.legend[key]
        self.send_state()


class SearchControl(Control):
    """ SearchControl Widget """
    _view_name = Unicode('LeafletSearchControlView').tag(sync=True)
    _model_name = Unicode('LeafletSearchControlModel').tag(sync=True)

    url = Unicode().tag(sync=True, o=True)
    zoom = Int(default_value=None, allow_none=True).tag(sync=True, o=True)
    property_name = Unicode('display_name').tag(sync=True, o=True)
    property_loc = List(['lat', 'lon']).tag(sync=True, o=True)
    jsonp_param = Unicode('json_callback').tag(sync=True, o=True)
    auto_type = Bool(False).tag(sync=True, o=True)
    auto_collapse = Bool(False).tag(sync=True, o=True)
    animate_location = Bool(False).tag(sync=True, o=True)
    found_style = Dict(default_value={"fillColor": "#3f0", "color": "#0f0"}).tag(sync=True, o=True)

    marker = Instance(Marker, allow_none=True, default_value=None).tag(sync=True, **widget_serialization)
    layer = Instance(LayerGroup, allow_none=True, default_value=None).tag(sync=True, **widget_serialization)

    _feature_found_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.on_msg(self._handle_leaflet_event)

    def _handle_leaflet_event(self, _, content, buffers):
        if content.get('event', '') == 'found':
            self._feature_found_callbacks(**content)

    def on_feature_found(self, callback, remove=False):
        """Add a found feature event listener for searching in GeoJSON layer.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on found event when searching in GeoJSON layer.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._feature_found_callbacks.register_callback(callback, remove=remove)


class MapStyle(Style, Widget):
    """Map Style Widget

    Custom map style.

    Attributes
    ----------
    cursor: str, default 'grab'
        The cursor to use for the mouse when it's on the map. Should be a valid CSS
        cursor value.
    """

    _model_name = Unicode('LeafletMapStyleModel').tag(sync=True)
    _model_module = Unicode("jupyter-leaflet").tag(sync=True)

    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    cursor = Enum(values=allowed_cursor, default_value='grab').tag(sync=True)


class Map(DOMWidget, InteractMixin):
    """Map class.

    The Map class is the main widget in ipyleaflet.

    Attributes
    ----------
    layers: list of Layer instances
        The list of layers that are currently on the map.
    controls: list of Control instances
        The list of controls that are currently on the map.
    center: list, default [0, 0]
        The current center of the map.
    zoom: float, default 12
        The current zoom value of the map.
    zoom_snap: float, default 1
        Forces the map’s zoom level to always be a multiple of this..
    zoom_delta: float, default 1
        Controls how much the map’s zoom level will change after
        pressing + or - on the keyboard, or using the zoom controls.
    crs: projection, default projections.EPSG3857
        Coordinate reference system, which can be ‘Earth’, ‘EPSG3395’, ‘EPSG3857’,
        ‘EPSG4326’, ‘Base’, ‘Simple’ or user defined projection.
    """

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
    zoom_delta = CFloat(1).tag(sync=True, o=True)
    zoom_snap = CFloat(1).tag(sync=True, o=True)
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

    bottom = Float(0, read_only=True).tag(sync=True)
    top = Float(9007199254740991, read_only=True).tag(sync=True)
    right = Float(0, read_only=True).tag(sync=True)
    left = Float(9007199254740991, read_only=True).tag(sync=True)

    layers = Tuple().tag(trait=Instance(Layer), sync=True, **widget_serialization)

    @default('layers')
    def _default_layers(self):
        basemap = self.basemap if isinstance(self.basemap, TileLayer) else basemap_to_tiles(self.basemap,
                                                                                            self.modisdate)

        basemap.base = True

        return (basemap,)

    bounds = Tuple(read_only=True)
    bounds_polygon = Tuple(read_only=True)
    pixel_bounds = Tuple(read_only=True)

    @observe('south', 'north', 'east', 'west')
    def _observe_bounds(self, change):
        self.set_trait('bounds', ((self.south, self.west),
                                  (self.north, self.east)))
        self.set_trait('bounds_polygon', ((self.north, self.west),
                                          (self.north, self.east),
                                          (self.south, self.east),
                                          (self.south, self.west)))

    @observe('bottom', 'top', 'right', 'left')
    def _observe_pixel_bounds(self, change):
        self.set_trait('pixel_bounds', ((self.left, self.top),
                                        (self.right, self.bottom)))

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
        self._layer_ids = [layer.model_id for layer in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise LayerException('duplicate layer detected, only use each layer once')
        return proposal.value

    def add_layer(self, layer):
        """Add a layer on the map.

        Parameters
        ----------
        layer: Layer instance
            The new layer to add.
        """
        if isinstance(layer, dict):
            layer = basemap_to_tiles(layer)
        if layer.model_id in self._layer_ids:
            raise LayerException('layer already on map: %r' % layer)
        self.layers = tuple([layer for layer in self.layers] + [layer])

    def remove_layer(self, rm_layer):
        """Remove a layer from the map.

        Parameters
        ----------
        layer: Layer instance
            The layer to remove.
        """
        if rm_layer.model_id not in self._layer_ids:
            raise LayerException('layer not on map: %r' % rm_layer)
        self.layers = tuple([layer for layer in self.layers if layer.model_id != rm_layer.model_id])

    def substitute_layer(self, old, new):
        """Replace a layer with another one on the map.

        Parameters
        ----------
        old: Layer instance
            The old layer to remove.
        new: Layer instance
            The new layer to add.
        """
        if isinstance(new, dict):
            new = basemap_to_tiles(new)
        if old.model_id not in self._layer_ids:
            raise LayerException('Could not substitute layer: layer not on map.')
        self.layers = tuple([new if layer.model_id == old.model_id else layer for layer in self.layers])

    def clear_layers(self):
        """Remove all layers from the map."""
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
        """Add a control on the map.

        Parameters
        ----------
        control: Control instance
            The new control to add.
        """
        if control.model_id in self._control_ids:
            raise ControlException('control already on map: %r' % control)
        self.controls = tuple([c for c in self.controls] + [control])

    def remove_control(self, control):
        """Remove a control from the map.

        Parameters
        ----------
        control: Control instance
            The control to remove.
        """
        if control.model_id not in self._control_ids:
            raise ControlException('control not on map: %r' % control)
        self.controls = tuple([c for c in self.controls if c.model_id != control.model_id])

    def clear_controls(self):
        """Remove all controls from the map."""
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

    def fit_bounds(self, bounds):
        """Sets a map view that contains the given geographical bounds
        with the maximum zoom level possible.

        Parameters
        ----------
        bounds: list of lists
            The lat/lon bounds in the form [[south, east], [north, west]].
        """
        asyncio.ensure_future(self._fit_bounds(bounds))

    async def _fit_bounds(self, bounds):
        (b_south, b_west), (b_north, b_east) = bounds
        center = b_south + (b_north - b_south) / 2, b_west + (b_east - b_west) / 2
        if center != self.center:
            self.center = center
            await wait_for_change(self, 'bounds')
        zoomed_out = False
        # zoom out
        while True:
            if self.zoom <= 1:
                break
            (south, west), (north, east) = self.bounds
            if south > b_south or north < b_north or west > b_west or east < b_east:
                self.zoom -= 1
                await wait_for_change(self, 'bounds')
                zoomed_out = True
            else:
                break
        if not zoomed_out:
            # zoom in
            while True:
                (south, west), (north, east) = self.bounds
                if south < b_south and north > b_north and west < b_west and east > b_east:
                    self.zoom += 1
                    await wait_for_change(self, 'bounds')
                else:
                    self.zoom -= 1
                    await wait_for_change(self, 'bounds')
                    break
