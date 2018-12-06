.. raw:: html
    :file: embed_widgets/circle_marker.html

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

.. raw:: html


    <script type="application/vnd.jupyter.widget-view+json">
    {
    "version_major": 2,
    "version_minor": 0,
    "model_id": "4d87774ea99b44049ef5c00a3db02520"
    }
    </script>
    <div style ="height:30px;"> </div>





Attributes
----------

==============    ================   ===
Attribute         Default Value      Doc
==============    ================   ===
location          (0.0, 0.0)         Circle location
radius            10                 Circle radius in pixels
stroke            True               Set it to `false` to disable borders
color             "#0033FF"          Stroke color
opacity           1.0                Stroke opacity
weight            5                  Stroke width in pixels
fill              True               Whether to fill the circle or not
fill_color        "#0033FF"
fill_opacity      0.2
dash_array
line_cap          "round"
line_join         "round"
==============    ================   ===
