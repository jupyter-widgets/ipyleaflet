GeoJSON
=======

Example
-------

.. jupyter-execute::

    import os
    import json
    import random
    import requests

    from ipyleaflet import Map, GeoJSON

    if not os.path.exists('europe_110.geo.json'):
      url = 'https://github.com/jupyter-widgets/ipyleaflet/raw/master/examples/europe_110.geo.json'
      r = requests.get(url)
      with open('europe_110.geo.json', 'w') as f:
        f.write(r.content.decode("utf-8"))

    with open('europe_110.geo.json', 'r') as f:
      data = json.load(f)

    def random_color(feature):
        return {
            'color': 'black',
            'fillColor': random.choice(['red', 'yellow', 'green', 'orange']),
        }

    m = Map(center=(50.6252978589571, 0.34580993652344), zoom=3)

    geo_json = GeoJSON(
        data=data,
        style={
            'opacity': 1, 'dashArray': '9', 'fillOpacity': 0.1, 'weight': 1
        },
        hover_style={
            'color': 'white', 'dashArray': '0', 'fillOpacity': 0.5
        },
        style_callback=random_color
    )
    m.add_layer(geo_json)

    m


Usage
-----

The ``GeoJSON`` layer is a widget, which means that you can update the ``data`` or any other attribute from Python and it will dynamically update the map:

.. code::

    geo_json.data = new_data
    geo_json.hover_style = new_hover_style


Attributes
----------

==============   ===
Attribute        Doc
==============   ===
data             Data dictionary
style            Style dictionary
hover_style      Hover style dictionary
style_callback   Styling function that is called for each feature, and should return the feature style. This styling function takes the feature as argument.
==============   ===

Methods
-------

=========    =====================================     ===
Method       Arguments                                 Doc
=========    =====================================     ===
on_click     Callable object                           Adds a callback on click event
on_hover     Callable object                           Adds a callback on hover event
=========    =====================================     ===
