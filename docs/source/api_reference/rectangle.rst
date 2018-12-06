.. raw:: html
    :file: embed_widgets/rectangle.html


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

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
    "version_major": 2,
    "version_minor": 0,
    "model_id": "0c255695e6294b2e92bc1a8af7688179"
    }
    </script>
    <div style ="height:30px;"> </div>




Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
bounds              ()                 SW and NE corners of the rectangle
stroke              True               Set it to `False` to disable borders
color               "#0033FF"          Stroke color
opacity             1.0                Stroke opacity
weight              5                  Stroke width in pixels
fill                True               Whether to fill the polygon or not
fill_color          "#0033FF"
fill_opacity        0.2
dash_array
line_cap            "round"
line_join           "round"
================    ================   ===
