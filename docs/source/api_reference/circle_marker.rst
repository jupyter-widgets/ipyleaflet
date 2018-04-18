Circle Marker
=============

Example
-------

.. code::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, CircleMarker

    watercolor = basemap_to_tiles(basemaps.Stamen.Watercolor)

    m = Map(layers=(watercolor, ), center=(53, 354), zoom=5)

    circle_marker = CircleMarker()
    circle_marker.location = (55, 360)
    circle_marker.radius = 50
    circle_marker.color = "red"
    circle_marker.fill_color = "red"

    m.add_layer(circle_marker)

    m

Attributes
----------

==============    ================   ===
Attribute         Default Value      Doc
==============    ================   ===
location          (0.0, 0.0)         Location of the circle
radius            10                 Radius of the circle, in pixels
stroke            True               Set it to `false` to disable borders
color             "#0033FF"          Color of the stroke
opacity           1.0                Opacity of the stroke
weight            5                  Width of the stroke in pixels
fill              True               Whether to fill the circle or not
fill_color        "#0033FF"
fill_opacity      0.2
dash_array
line_cap          "round"
line_join         "round"
==============    ================   ===
