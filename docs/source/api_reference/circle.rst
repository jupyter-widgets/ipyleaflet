Circle
======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, Circle

    watercolor = basemap_to_tiles(basemaps.Stamen.Watercolor)

    m = Map(layers=(watercolor, ), center=(53, 354), zoom=5)

    circle = Circle()
    circle.location = (50, 354)
    circle.radius = 50000
    circle.color = "green"
    circle.fill_color = "green"

    m.add_layer(circle)

    m


Attributes
----------

==============    ================   ===
Attribute         Default Value      Doc
==============    ================   ===
location          (0.0, 0.0)         Circle location
radius            10                 Circle radius in meters
stroke            True               Set it to `false` to disable borders
color             "#0033FF"          Stroke color
opacity           1.0                Stroke opacity
weight            5                  Stroke width in pixels
fill              True               Whether to fill the circle or not
fill_color        None
fill_opacity      0.2
dash_array
line_cap          "round"
line_join         "round"
==============    ================   ===
