Scale Control
=============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, ScaleControl

    m = Map(zoom=5, center=[51.64, -76.52])
    m.add_control(ScaleControl(position='bottomleft'))

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.ScaleControl
   :members: