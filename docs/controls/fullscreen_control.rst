Fullscreen Control
==================

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, FullScreenControl

    m = Map(zoom=5, center=[51.64, -76.52])
    m.add(FullScreenControl())

    m

Attributes
----------

.. autoclass:: ipyleaflet.leaflet.FullScreenControl
   :members:
