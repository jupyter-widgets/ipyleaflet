GeoJSON
=======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, GeoJSON
    import json
    import os
    import requests

    if not os.path.exists('europe_110.geo.json'):
      url = 'https://github.com/jupyter-widgets/ipyleaflet/raw/master/examples/europe_110.geo.json'
      r = requests.get(url)
      with open('europe_110.geo.json', 'w') as f:
        f.write(r.content.decode("utf-8"))

    with open('europe_110.geo.json', 'r') as f:
      data = json.load(f)

    m = Map(center=(50.6252978589571, 0.34580993652344), zoom=3)
    geo_json = GeoJSON(data=data, style = {'color': 'green', 'opacity':1, 'weight':1.9, 'dashArray':'9', 'fillOpacity':0.1})
    m.add_layer(geo_json)
    m


Attributes
----------

============   ===
Attribute      Doc
============   ===
data           Data dictionary
style          Style dictionary
hover_style    Hover style dictionary
============   ===

Methods
-------

=========    =====================================     ===
Method       Arguments                                 Doc
=========    =====================================     ===
on_click     Callable object                           Adds a callback on click event
on_hover     Callable object                           Adds a callback on hover event
=========    =====================================     ===
