WKTLayer
=========

``WKTLayer`` is an ``ipyleaflet`` class that allows you to visualize a `WKT data
<https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry>`_ on the Map.


Example
-------

.. jupyter-execute::

    import os
    import requests

    from ipyleaflet import Map, WKTLayer

    if not os.path.exists("test.wkt"):
        url = "https://github.com/jupyter-widgets/ipyleaflet/raw/master/examples/data/test.wkt"
        r = requests.get(url)
        with open("test.wkt", "w") as f:
            f.write(r.content.decode("utf-8"))

    m = Map(center=(42.3152960829043, -71.1031627617667), zoom=17)
    wlayer = WKTLayer(path="test.wkt", hover_style={"fillColor": "red"})
    m.add(wlayer)

    m

You can also provide WKT string as input.

.. jupyter-execute::

    from ipyleaflet import Map, WKTLayer

    m = Map(center=(-25.0927734375, 10.689697265625), zoom=4)
    wlayer = WKTLayer(
        wkt_string="POLYGON((10.689697265625 -25.0927734375, 34.595947265625 -20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 -39.1552734375, 10.689697265625 -25.0927734375))",
        hover_style={"fillColor": "red"},
    )
    m.add(wlayer)

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.WKTLayer
   :members:
