Circle Marker
=============

Example
-------

.. jupyter-execute::

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

.. autoclass:: ipyleaflet.leaflet.CircleMarker
   :members:
