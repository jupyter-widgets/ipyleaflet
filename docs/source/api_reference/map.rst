.. raw:: html
    :file: embed_widgets/map.html

Map
===

Example
-------

.. code::

    from ipyleaflet import Map, basemaps, basemap_to_tiles

    m = Map(
        layers=(basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-04-08"), ),
        center=(52.204793, 360.121558),
        zoom=4
    )

    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
    "model_id": "ab2369332a024dda83800361d0a1343e",
    "version_major": 2,
    "version_minor": 0
    }
    </script>

Attributes
----------

========================    ===============                     ===
Attribute                   Default Value                       Doc
========================    ===============                     ===
layers                      (default_layer)                     Tuple of layers
controls                    ()                                  Tuple of controls
center                      (0.0, 0.0)                          Initial geographic center of the map
zoom                        12                                  Initial map zoom level
max_zoom                    18
min_zoom                    1
dragging                    True                                Whether the map be draggable with mouse/touch or not
touch_zoom                  True                                Whether the map can be zoomed by touch-dragging with two fingers on mobile
scroll_wheel_zoom           False                               Whether the map can be zoomed by using the mouse wheel
double_click_zoom           True                                Whether the map can be zoomed in by double clicking on it and zoomed out by double clicking while holding shift
box_zoom                    True                                Whether the map can be zoomed to a rectangular area specified by dragging the mouse while pressing the shift key
tap                         True                                Enables mobile hacks for supporting instant taps
tap_tolerance               15                                  The max number of pixels a user can shift his finger during touch for it to be considered a valid tap
world_copy_jump             False                               With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to
close_popup_on_click        True                                Set it to False if you don't want popups to close when user clicks the map
bounce_at_zoom_limits       True                                Set it to False if you don't want the map to zoom beyond min/max zoom and then bounce back when pinch-zooming
keyboard                    True                                Makes the map focusable and allows users to navigate the map with keyboard arrows and +/- keys
keyboard_pan_offset         80
keyboard_zoom_offset        1
inertia                     True                                If enabled, panning of the map will have an inertia effect
inertia_deceleration        3000                                The rate with which the inertial movement slows down, in pixels/second²
inertia_max_speed           1500                                Max speed of the inertial movement, in pixels/second
zoom_control                True
attribution_control         True
zoom_animation_threshold    4
========================    ===============                     ===

Methods
-------

================   =====================================     ===
Method             Arguments                                 Doc
================   =====================================     ===
add_layer          Layer instance                            Add a new layer to the map
remove_layer       Layer instance                            Remove a layer from the map
clear_layers                                                 Remove all layers from the map
add_control        Control instance                          Add a new control to the map
remove_control     Control instance                          Remove a control from the map
clear_controls                                               Remove all controls from the map
on_interaction     callable object                           Add a callback on interaction
================   =====================================     ===
