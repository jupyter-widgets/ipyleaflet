Zoom Control
============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, ZoomControl

    m = Map(zoom=5, center=[51.64, -76.52], zoom_control=False)  # Do not automatically create a ZoomControl
    m.add(ZoomControl(position='topright'))

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.ZoomControl
   :members: