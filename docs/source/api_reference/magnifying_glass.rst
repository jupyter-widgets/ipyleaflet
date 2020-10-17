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

==============    ===================================================================    ====
Attribute         Default Value                                                          Doc
==============    ===================================================================    ====
radius            100                                                                    Radius of the magnifying glass in pixels.
zoom_offset       3                                                                      Zoom level offset between the main map zoom and the magnifying glass.
fixed_zoom        -1                                                                     Fixed zoom level to always use (if different than -1).
fixed_position    False                                                                  If True, the magnifying glass will stay at the same position.
lat_lng           [0, 0]                                                                 Initial position of the magnifying glass.
layers            []                                                                     Set of layers to display in the magnified view.
==============    ===================================================================    ====
