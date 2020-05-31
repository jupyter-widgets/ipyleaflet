Search Control
==============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, SearchControl, Marker, AwesomeIcon

    m = Map(zoom=3, center=[19.1646, 72.8493])

    marker = Marker(icon=AwesomeIcon(name="check", marker_color='green', icon_color='darkgreen'))

    m.add_control(SearchControl(
      position="topleft",
      url='https://nominatim.openstreetmap.org/search?format=json&q={s}',
      zoom=5,
      marker=marker
    ))

    m


Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
url                 ''                 The url used for the search queries.
zoom                10                 Default zoom level for move to location
marker              Marker()           The marker used by the control.
================    ================   ===
