Rectangle
=========

Example
-------

.. code::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, Rectangle

    watercolor = basemap_to_tiles(basemaps.Stamen.Watercolor)

    m = Map(layers=(watercolor, ), center=(53, 354), zoom=5)

    rectangle = Rectangle(bounds=((52, 354), (53, 360)))

    m.add_layer(rectangle)

    m

Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
bounds              ()                 SW and NE corners of the rectangle
stroke              True               Set it to `False` to disable borders
color               "#0033FF"          Color of the stroke
opacity             1.0                Opacity of the stroke
weight              5                  Width of the stroke in pixels
fill                True               Whether to fill the polygon or not
fill_color          "#0033FF"
fill_opacity        0.2
dash_array
line_cap            "round"
line_join           "round"
================    ================   ===
