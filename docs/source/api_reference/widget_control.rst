.. raw:: html
    :file: embed_widgets/widget_control.html

Widget Control
================

Example
-------

.. code::

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

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
        "version_major": 2,
        "version_minor": 0,
        "model_id": "6fa0bd5f965f4887b8fff4cea0bfea71"
    }
    </script>


Attributes
----------

=====================   ========================================
Attribute               Doc
=====================   ========================================
widget                  Widget content
min_width               Min width of the widget
max_width               Min width of the widget
min_height              Min height of the widget
max_height              Min height of the widget
=====================   ========================================
