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
    import os
    import requests

    from ipyleaflet import AwesomeIcon, GeoJSON, Map, Marker, LayerGroup, SearchControl

    m = Map(zoom=3, center=[19.1646, 72.8493])

    if not os.path.exists('europe_110.geo.json'):
          url = 'https://github.com/jupyter-widgets/ipyleaflet/raw/master/examples/europe_110.geo.json'
          r = requests.get(url)
          with open('europe_110.geo.json', 'w') as f:
            f.write(r.content.decode("utf-8"))

    with open("europe_110.geo.json") as f:
        data = json.load(f)

    europe = GeoJSON(data=data)

    layer_group = LayerGroup(layers=(europe,))
    marker = Marker(icon=AwesomeIcon(name="check", marker_color='green', icon_color='darkred'))

    m.add_control(SearchControl(
      position="topleft",
      layer=layer_group,
      zoom=4,
      property_name='name',
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
layer               None               The LayerGroup used for search queries.
zoom                10                 Default zoom level for move to location
marker              Marker()           The marker used by the control.
================    ================   ===
