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

You can add a callback that will be run when on search found:

.. jupyter-execute::

    m = Map(center=[47, 2], zoom=5)

    search = SearchControl(
        position="topleft",
        url='https://cartoradon.irsn.fr/commune.py/communes/search/FR/{s}?',
        zoom=5
    )
    m.add_control(search)

    def on_found(**kwargs):
        # Print the result of the search (text, location etc)
        print(kwargs)

    search.on_location_found(on_found)

    m

You can also search features from GeoJSON layers.

.. jupyter-execute::

    import json
    import os
    import requests

    from ipyleaflet import AwesomeIcon, GeoJSON, Map, Marker, LayerGroup, SearchControl

    m = Map(zoom=3, center=[19.1646, 72.8493])

    if not os.path.exists('countries.geo.json'):
          url = 'https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/countries.geo.json'
          r = requests.get(url)
          with open('countries.geo.json', 'w') as f:
            f.write(r.content.decode("utf-8"))

    with open("countries.geo.json") as f:
        data = json.load(f)

    countries = GeoJSON(data=data)

    layer_group = LayerGroup(layers=(countries,))
    marker = Marker(icon=AwesomeIcon(name="check", marker_color='green', icon_color='darkred'))

    m.add_control(SearchControl(
      position="topleft",
      layer=layer_group,
      zoom=4,
      property_name='name',
      marker=marker
    ))

    m

Methods
-------

.. autoclass:: ipyleaflet.leaflet.SearchControl
   :members:


