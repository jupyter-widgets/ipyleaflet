SplitMap Control
================

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, SplitMapControl

    m = Map(center=(42.6824, 365.581), zoom=5)

    right_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-11-11")
    left_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisAquaBands721CR, "2017-11-11")

    control = SplitMapControl(left_layer=left_layer, right_layer=right_layer)
    m.add_control(control)

    m


Attributes
----------

=====================   ========================================    ================   ===
Attribute               Type                                        Default Value      Doc
=====================   ========================================    ================   ===
left_layer              Layer instance                                                 Left layer
right_layer             Layer instance                                                 Right layer
=====================   ========================================    ================   ===
