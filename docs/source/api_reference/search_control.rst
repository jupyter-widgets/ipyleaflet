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

You can also search features from GeoJSON layers.

.. jupyter-execute::

    import json

    from ipyleaflet import Map, LayerGroup SearchControl

    m = Map(zoom=3, center=[19.1646, 72.8493])

    with open("countries.geo.json") as f:
        data = json.load(f)

    countries = GeoJSON(data=data)

    layer_group = LayerGroup(layers=(countries,))

    m.add_control(SearchControl(
      position="topleft",
      layer=layer_group,
      zoom=4,
      property_name='name'
    ))

    m

Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
url                 ''                 The url used for the search queries.
layer               None               The LayerGroup used for search queries.
zoom                10                 Default zoom level for move to location
marker              Marker()           The marker used by the control.
================    ================   ===
