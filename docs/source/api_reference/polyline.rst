Polyline
========

Example Polyline
----------------

.. jupyter-execute::

    from ipyleaflet import Map, Polyline

    line = Polyline(
        locations=[
            [45.51, -122.68],
            [37.77, -122.43],
            [34.04, -118.22]
        ],
        color="green" ,
        fill=False
    )

    m = Map(center = (42.5, -41), zoom =2)
    m.add_layer(line)
    m


Example MultiPolyline
---------------------


.. jupyter-execute::

      from ipyleaflet import Map, Polyline

      lines = Polyline(
          locations=[
              [[45.51, -122.68],
               [37.77, -122.43],
               [34.04, -118.2]],
              [[40.78, -73.91],
               [41.83, -87.62],
               [32.76, -96.72]]
          ],
          color="green" ,
          fill=False
      )

      m = Map(center = (42.5, -41), zoom =2)
      m.add_layer(lines)
      m


Attributes
----------

=============    ================   ===
Attribute        Default Value      Doc
=============    ================   ===
locations        [[]]               List of list of points of the polygon
stroke           True               Set it to `False` to disable borders
color            "#0033FF"          Stroke color
opacity          1.0                Stroke opacity
weight           5                  Stroke width in pixels
fill             True               Whether to fill the polyline or not
fill_color       None
fill_opacity     0.2
dash_array
line_cap         "round"
line_join        "round"
=============    ================   ===
