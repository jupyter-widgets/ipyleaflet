Magnifying Glass
================

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, MagnifyingGlass, basemaps, basemap_to_tiles
    m = Map(center=(0, 0), zoom=2)

    topo_layer = basemap_to_tiles(basemaps.OpenTopoMap)
    magnifying_glass = MagnifyingGlass(layers=[topo_layer])

    m.add_layer(magnifying_glass)

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.MagnifyingGlass
   :members: