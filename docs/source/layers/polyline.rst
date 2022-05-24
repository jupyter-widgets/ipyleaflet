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
    m.add(line)
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
      m.add(lines)
      m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.Polyline
   :members:
