Rectangle
=========

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, Rectangle

    watercolor = basemap_to_tiles(basemaps.Stadia.StamenTerrain)

    m = Map(layers=(watercolor, ), center=(53, 354), zoom=5)

    rectangle = Rectangle(bounds=((52, 354), (53, 360)))

    m.add(rectangle)

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.Rectangle
   :members:
