Widget Control
==============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, WidgetControl
    from ipywidgets import IntSlider, ColorPicker, jslink

    m = Map(center=(46.01, 6.16), zoom=12, basemap=basemaps.Stamen.Terrain)
    zoom_slider = IntSlider(description='Zoom level:', min=0, max=15, value=7)
    jslink((zoom_slider, 'value'), (m, 'zoom'))
    widget_control1 = WidgetControl(widget=zoom_slider, position='topright')
    m.add_control(widget_control1)

    color_picker = ColorPicker(description='Pick a color:')
    widget_control2 = WidgetControl(widget=color_picker, position='bottomright')
    m.add_control(widget_control2)
    m


Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
widget              None               Widget content
min_width           None               Min width of the widget (in pixels), if None it will respect the content size
max_width           None               Max width of the widget (in pixels), if None it will respect the content size
min_height          None               Min height of the widget (in pixels), if None it will respect the content size
max_height          None               Max height of the widget (in pixels), if None it will respect the content size
================    ================   ===
