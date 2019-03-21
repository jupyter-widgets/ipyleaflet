Local Tile Layer
================

Example
-------

.. code::

    from ipyleaflet import Map, LocalTileLayer

    m = Map(center=(52.204793, 360.121558), zoom=9)
    m.add_layer(LocalTileLayer(url='./tiles/{z}/{x}/{y}.png'))

    m

Attributes
----------

===============    =================  =====
Attribute          Default Value      Doc
===============    =================  =====
url                ""                 Relative URL (e.g. './tiles/{z}/{x}/{y}.png')
===============    =================  =====
