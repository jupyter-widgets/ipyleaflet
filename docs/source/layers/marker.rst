Marker
======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Marker

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=15)

    marker = Marker(location=center, draggable=False)
    m.add_layer(marker);

    m


Attributes and methods
----------------------

.. autoclass:: ipyleaflet.leaflet.Marker
   :members:
