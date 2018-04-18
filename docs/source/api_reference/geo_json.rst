GeoJSON
=======

Example
-------

.. code::

    from ipyleaflet import Map, GeoJSON
    import json

    # Load a local file
    with open('geo.json') as f:
        data = json.load(f)

    m = Map(center=(34.6252978589571, -77.34580993652344), zoom=10)

    geo_json = GeoJSON(data=data)
    m.add_layer(geo_json);

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
