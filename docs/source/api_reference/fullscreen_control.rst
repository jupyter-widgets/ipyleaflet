Fullscreen Control
==================

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, FullScreenControl

    m = Map(zoom=5, center=[51.64, -76.52])
    m.add_control(FullScreenControl())

    m


================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
================    ================   ===
