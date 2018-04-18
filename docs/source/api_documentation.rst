Map
===

.. code::

    from ipyleaflet import Map

    m = Map(
        layers=[layer1, layer2, layer3...],
        controls=[control1, control2, control3...],
        center=[52.204793, 360.121558], # Initial geographic center of the map
        zoom=15,                    # Initial map zoom level
        max_zoom=18,
        min_zoom=1,
        dragging=True,              # Whether the map be draggable with mouse/touch or not
        touch_zoom=True,            # Whether the map can be zoomed by touch-dragging with two fingers on mobile
        scroll_wheel_zoom=False,    # Whether the map can be zoomed by using the mouse wheel
        double_click_zoom=True,     # Whether the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift
        box_zoom=True,              # Whether the map can be zoomed to a rectangular area
                                    #specified by dragging the mouse while pressing the shift key
        tap=True,                   # Enables mobile hacks for supporting instant taps
        tap_tolerance=15,           # The max number of pixels a user can shift his finger during touch for it to be considered a valid tap
        world_copy_jump=False,      # With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to
                                    # the original one so that all overlays like markers and vector layers are still visible
        close_popup_on_click=True,  # Set it to False if you don't want popups to close when user clicks the map
        bounce_at_zoom_limits=True, # Set it to False if you don't want the map to zoom beyond min/max zoom and then bounce back when pinch-zooming
        keyboard=True,              # Makes the map focusable and allows users to navigate the map with keyboard arrows and +/- keys
        keyboard_pan_offset=80,
        keyboard_zoom_offset=1,
        inertia=True,               # If enabled, panning of the map will have an inertia effect
        inertia_deceleration=3000,  # The rate with which the inertial movement slows down, in pixels/second²
        inertia_max_speed=1500,     # Max speed of the inertial movement, in pixels/second
        zoom_control=True,
        attribution_control=True,
        zoom_animation_threshold=4
    )

    m

One could want to react on special map events like ``mousemove``, this can be achieved by using the ``on_interaction`` method of map:

.. code::

    from ipyleaflet import Map

    def handle_interaction(**kwargs):
        if kwargs.get('type') == 'mousemove':
            print('Mouse position: ', str(kwargs.get('coordinates')))

    m = Map()

    m.on_interaction(handle_interaction)
    m

The list of possible events accessible from ``kwargs.get('type')`` is the following:
    - ``click``
    - ``dblclick``
    - ``mousedown``
    - ``mouseup``
    - ``mouseover``
    - ``mouseout``
    - ``mousemove``
    - ``contextmenu``
    - ``preclick``

The map widget works with a list of layers. Layers are instances of ``TileLayer``, ``Marker``, ``Popup``, ``WMSLayer``, ``ImageOverlay``,
``VideoOverlay``, ``Polygon``, ``Rectangle``, ``CircleMarker``, ``Cirlce``, ``MarkerCluster``, ``LayerGroup`` or ``GeoJSON``.

.. code::

    from ipyleaflet import Map

    m = Map()

    m.add_layer(marker)
    m += circle
    m.add_layer(layer_group)

    m.remove_layer(circle)

    m.clear_layers()

It is also possible to have a list of controls on the map. Controls are instances of ``LayersControl``, ``SplitMapControl`` or ``DrawControl``.

.. code::

    from ipyleaflet import Map

    m = Map()

    m.add_control(control1)
    m.add_control(control2)

    m.remove_control(control1)

    m.clear_controls()

TileLayer
=========

Creating a ``TileLayer`` is straightforward, a list of basic tile layers is provided.
This list of layers can be accessed using the ``basemaps`` variable. A ``TileLayer`` instance can be created using this ``basemaps`` variable, specifying the wanted map
(e.g. ``basemaps.CartoDB.DarkMatter``, ``basemaps.Strava.Winter``, ``basemaps.NASAGIBS.ModisTerraTrueColorCR``, ...):

.. code::

    from ipyleaflet import Map, basemaps, basemap_to_tiles

    m = Map(center=[47.3388, 360.8349], zoom=5, basemap=basemaps.NASAGIBS.ModisTerraTrueColorCR)

    strava_layer = basemap_to_tiles(basemaps.Strava.Winter)
    m.add_layer(strava_layer)

Sometimes one could want to specify the date of the given images, for instance with NASA images:

.. code::

    nasa_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-04-08")

    m.add_layer(nasa_layer)

It is also possible to change the opacity of the ``TileLayer``:

.. code::

    nasa_layer.opacity = 0.5

And make it visible or not:

.. code::

    nasa_layer.visible = False

If the user knows the url to his map, he can create a ``TileLayer`` with the following:

.. code::

    from ipyleaflet import TileLayer

    user_layer = TileLayer(
        url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/MODIS_Terra_CorrectedReflectance_TrueColor/default/2018-02-25/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg",
        attribution="Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href='https://earthdata.nasa.gov'>ESDIS</a>) with funding provided by NASA/HQ.",
        name="NASAGIBS.ModisTerraTrueColorCR",
        max_zoom=9,
        opacity=0.5,
        visible=True
    )

Marker
======

.. code::

    from ipyleaflet import Map, Marker

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=15)

    marker = Marker(
        location=center,
        draggable=True,     # Whether the marker is draggable with mouse/touch or not
        keyboard=True,      # Whether the marker can be tabbed to with a keyboard and clicked by pressing enter
        title="My marker",  # Text for the browser tooltip that appear on marker hover (no tooltip by default)
        alt="marker",       # Text for the `alt` attribute of the icon image (useful for accessibility)
        rise_on_hover=True, # If `True`, the marker will get on top of others when you hover the mouse over it
        rise_offset=250,    # The z-index offset used for the `rise_on_hover` feature
        opacity=1.0,
        visible=True,
        z_index_offset=0,   # By default, marker images z_index is set automatically based on its latitude.
                            # Use this option if you want to put the marker on top of all others (or below),
                            # specifying a high value like `1000` (or high negative value, respectively)
    )

    m.add_layer(marker)
    m

If the marker is draggable, it can be useful to have an ``on_move`` event callback:

.. code::

    def handle_move(**kwargs):
        print("Marker location: ", str(kwargs.get('location')))

    marker.on_move(handle_move)

Popup
=====

.. code::

    from ipyleaflet import Map, Popup

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=15)

    popup = Popup(
        location=center,
        max_width=300,            # Max width of the popup, in pixels
        min_width=50,             # Min width of the popup, in pixels
        max_height=50,            # If set, creates a scrollable container of the given height inside a popup if its content exceeds it
        auto_pan=True,            # Set it to `False` if you don't want the map to do panning animation to fit the opened popup
        auto_pan_padding={5, 5},
        keep_in_view=True,        # Set it to `True` if you want to prevent users from panning the popup off of the screen while it is open
        close_button=True,        # Controls the presence of a close button in the popup
        auto_close=True,          # Set it to `False` if you want to override the default behavior of the popup closing when another popup is opened
        close_on_escape_key=True, # Set it to `False` if you want to override the default behavior of the ESC key for closing of the popup
        class_name=""            # A custom CSS class name to assign to the popup
    )

    m

There are two ways to create a ``Popup``, the first one is to create a popup with a location and add it to the map.
The second one is to use the ``popup`` attribute of a layer, for example you could create a widget instance like a
button and bind it to the popup attribute of a marker:

.. code::

    from ipywidgets import Button

    from ipyleaflet import Marker, Popup

    button = Button(
        description="button",
        button_style="success"
    )

    marker = Marker(location=center, popup=button)

    m.add_layer(marker)
    m

Doing this will create a popup which will appear when clicking on the marker.

WMSLayer
========

.. code::

    from ipyleaflet import Map, WMSLayer

    center = (42.5531, -48.6914)

    m = Map(center=center, zoom=3)

    wms_layer = WMSLayer(
        url="https://demo.boundlessgeo.com/geoserver/ows?",
        layers="nasa:bluemarble", # Comma-separated list of WMS layers to show
        service="WMS",
        request="GetMap",
        styles="",                # Comma-separated list of WMS styles
        format="image/jpeg",      # WMS image format (use `'image/png'` for layers with transparency)
        transparent=False,        # If `True`, the WMS service will return images with transparency
        version="1.1.1"           # Version of the WMS service to use
    )

    m.add_layer(wms_layer)
    m

ImageOverlay and VideoOverlay
=============================

.. code::

    from ipyleaflet import Map, VideoOverlay

    m = Map(center=(25, -115), zoom=4)

    video_overlay = VideoOverlay(
        url="https://www.mapbox.com/bites/00188/patricia_nasa.webm",
        bounds=((13, -130), (32, -100)), # SW and NE corners of the image
        attribution="mapbox"
    )

    m.add_layer(video_overlay)
    m

Polygon
=======

.. code::

    from ipyleaflet import Map, basemaps, Polygon

    center = (53, 354)
    m = Map(center=center, zoom=5, basemap=basemaps.Stamen.Watercolor)

    polygon = Polygon(
        locations=((52, 354), (52, 360), (53, 354)), # Array of LatLng points
        stroke=True,           # Whether to draw stroke along the path. Set it to `False` to disable borders on polygons or circles
        color="#0033FF",
        opacity=1.0,
        weight=5,              # Stroke width in pixels
        fill=True,
        fill_color="blue",
        fill_opacity=0.2,
        class_name=""
    )

    m.add_layer(polygon)
    m

Rectangle
=========

.. code::

    from ipyleaflet import Map, basemaps, Rectangle

    center = (53, 354)
    m = Map(center=center, zoom=5, basemap=basemaps.Stamen.Watercolor)

    rectangle = Rectangle(
        bounds=((50, 354), (55, 360)), # SW and NE location tuples
        stroke=False,                  # Whether to draw stroke along the path. Set it to `False` to disable borders on polygons or circles
        # color="green",
        # opacity=1.0,
        # weight=5,                    # Stroke width in pixels
        fill=True,
        fill_color="green",
        fill_opacity=0.6,
        class_name="",
        smooth_factor=1.0,             # How much to simplify the polygon on each zoom level. More means
                                       # better performance and smoother look, and less means more accurate representation
        no_clip=False                  # Disable polygon clipping
    )

    m.add_layer(rectangle)
    m

CircleMarker
============

.. code::

    from ipyleaflet import Map, CircleMarker

    m = Map()

    circle_marker = CircleMarker(
        location=(0.0, 0.0),
        radius=10,           # Radius of circle in pixels
        stroke=True,         # Whether to draw stroke along the path. Set it to `False` to disable borders on polygons or circles
        color="#0033FF",
        opacity=1.0,
        weight=5,            # Stroke width in pixels
        fill=True,
        fill_color="#0033FF",
        fill_opacity=0.2,
        class_name=""
    )

    m.add_layer(circle_marker)
    m

Circle
======

.. code::

    from ipyleaflet import Map, Circle

    m = Map()

    circle = Circle(
        location=(0.0, 0.0),
        radius=10,           # Radius of circle in meters
        stroke=True,         # Whether to draw stroke along the path. Set it to `False` to disable borders on polygons or circles
        color="yellow",
        opacity=1.0,
        weight=5,            # Stroke width in pixels
        fill=True,
        fill_color="yellow",
        fill_opacity=0.5,
        class_name=""
    )

    m.add_layer(circle)
    m

MarkerCluster
=============

.. code::

    from ipyleaflet import MarkerCluster

    marker_cluster = MarkerCluster(markers=(marker1, marker2, marker3 ...))

LayerGroup
==========

.. code::

    from ipyleaflet import LayerGroup

    layer_group = LayerGroup(layers=(layer1, layer2, layer3 ...))

It is possible to add new layers or remove layers using the following:

.. code::

    layer_group = LayerGroup()

    layer_group.add_layer(marker)
    layer_group.add_layer(circle)
    layer_group.add_layer(video_overlay)

    # The layer group now contains {marker, circle, video_overlay}

    layer_group.remove_layer(circle)

    # The layer group now contains {marker, video_overlay}

    layer_group.clear_layers()

    # The layer group is now empty

GeoJSON
=======

.. code::

    from ipyleaflet import GeoJSON

    geo_json = GeoJSON(
        data={...},
        style={...},
        hover_style={...}
    )

It is possible to create a ``GeoJSON`` from a json file:

.. code::

    from ipyleaflet import GeoJSON
    import json

    with open('geo.json') as f:
        data = json.load(f)

    geo_json = GeoJSON(
        data=data
    )

The ``GeoJSON`` class comes with two events methods:

.. code::

    def print_event(**kwargs):
        print(kwargs)

    geo_json.on_hover(print_event);
    geo_json.on_click(print_event);

LayersControl
=============

The ``LayersControl`` allows one to display a selector on the top right of the map in order to select which tile layer to display on the map.

.. code::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, WMSLayer, LayersControl

    m = Map(center=(50, 354), zoom=4)

    nasa_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR)
    m.add_layer(nasa_layer)

    wms_layer = WMSLayer(
        url="https://demo.boundlessgeo.com/geoserver/ows?",
        layers="nasa:bluemarble",
        name="nasa:bluemarble"
    )
    m.add_layer(wms_layer)

    m.add_control(LayersControl());
    m

SplitMapControl
===============

The ``SplitMapControl`` allows one to display two tile layers at the same time on the map with a slider in the middle.

.. code::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, SplitMapControl

    m = Map(center=(42.6824, 365.581), zoom=5)

    right_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-11-11")
    left_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisAquaBands721CR, "2017-11-11")

    split_map_control = SplitMapControl(
        left_layer=left_layer,
        right_layer=right_layer
    )

    m.add_control(split_map_control)
    m

DrawControl
===========

The ``DrawControl`` allows one to draw shapes on the map such as ``Rectangle`` ``Circle`` or lines.

.. code::

    from ipyleaflet import Map, basemaps, DrawControl

    m = Map(center=(42.6824, 365.581), zoom=5, basemap=basemaps.Stamen.Watercolor)

    m.add_control(DrawControl())
    m


.. _xproperty: https://github.com/QuantStack/xproperty
.. _documentation: https://github.com/QuantStack/xwidgets/blob/master/docs/source/usage.rst
.. _xwidgets: https://github.com/QuantStack/xwidgets
.. _leaflet: http://leafletjs.com/
