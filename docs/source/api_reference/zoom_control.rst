Zoom Control
============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, ZoomControl

    m = Map(zoom=5, center=[51.64, -76.52], zoom_control=False)  # Do not automatically create a ZoomControl
    m.add_control(ZoomControl(position='topright'))

    m


Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
zoom_in_text        '+'                Text to show in the "zoom in" button
zoom_in_title       'Zoom in'          Text to show on mouse hover on the "zoom in" button
zoom_out_text       '-'                Text to show in the "zoom out" button
zoom_out_title      'Zoom out'         Text to show on mouse hover on the "zoom out" button
================    ================   ===
