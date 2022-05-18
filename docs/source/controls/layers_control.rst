Layers Control
==============



The ``LayersControl`` allows one to display a layer selector on the map in order
to select which layers to display on the map.

All layers have a ``name`` attribute which is displayed in the selector and can be changed
by the user.

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Marker, LayersControl

    m = Map(center=(50, 0), zoom=5)

    marker1 = Marker(name='marker1', location=(48, -2))
    marker2 = Marker(name='marker2', location=(50, 0))
    marker3 = Marker(name='marker3', location=(52, 2))
    m.add(marker1)
    m.add(marker2)
    m.add(marker3)

    control = LayersControl(position='topright')
    m.add(control)

    m

Attributes
----------

.. autoclass:: ipyleaflet.leaflet.LayersControl
   :members: