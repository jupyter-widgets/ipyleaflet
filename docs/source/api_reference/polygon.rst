Polygon
=======

Example
-------

.. code::

    from ipyleaflet import Map, Polygon

    polygon = Polygon(
        locations=[(42, -49), (43, -49), (43, -48)],
        color="green",
        fill_color="green"
    )

    m = Map(center=(42.5531, -48.6914), zoom=6)
    m.add_layer(polygon);

    m

Attributes
----------

=============    ================   ===
Attribute        Default Value      Doc
=============    ================   ===
locations        []                 List of points of the polygon
stroke           True               Set it to `False` to disable borders
color            "#0033FF"          Color of the stroke
opacity          1.0                Opacity of the stroke
weight           5                  Width of the stroke in pixels
fill             True               Whether to fill the polygon or not
fill_color       "#0033FF"
fill_opacity     0.2
dash_array
line_cap         "round"
line_join        "round"
=============    ================   ===
