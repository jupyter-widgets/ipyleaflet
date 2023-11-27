Circle
======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, Circle

    watercolor = basemap_to_tiles(basemaps.Stadia.StamenTerrain)

    m = Map(layers=(watercolor, ), center=(53, 354), zoom=5)

    circle = Circle()
    circle.location = (50, 354)
    circle.radius = 50000
    circle.color = "green"
    circle.fill_color = "green"

    m.add(circle)

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.Circle
   :members: