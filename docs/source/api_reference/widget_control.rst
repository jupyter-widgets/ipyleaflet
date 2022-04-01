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

.. autoclass:: ipyleaflet.leaflet.WidgetControl
   :members:
