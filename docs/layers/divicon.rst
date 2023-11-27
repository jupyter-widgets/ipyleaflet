DivIcon
======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Marker, DivIcon, Map

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=10)
    icon = DivIcon(html='foo bar', bg_pos=[0, 0], icon_size=[150, 150])
    mark = Marker(location=center, icon=icon)
    m.add(mark);

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.DivIcon
   :members: