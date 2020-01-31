Scale Control
=============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, ScaleControl

    m = Map(zoom=5, center=[51.64, -76.52])
    m.add_control(ScaleControl(position='bottomleft'))

    m


Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
max_width           100                Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
metric              True               Whether to show the metric scale line (m/km).
imperial            True               Whether to show the imperial scale line (mi/ft).
update_when_idle    False              If true, the control is updated only after ending dragging the Map, otherwise it's always up-to-date (updated during move).
================    ================   ===
