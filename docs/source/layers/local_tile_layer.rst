Local Tile Layer
================

Example
-------

.. code::

    from ipyleaflet import Map, LocalTileLayer

    m = Map(center=(52.204793, 360.121558), zoom=9)
    m.add(LocalTileLayer(path='tiles/{z}/{x}/{y}.png'))

    m

Note that the behavior is different in Jupyter Notebook and in JupyterLab.

In the classic Jupyter Notebook, the path is relative to the Notebook you are working on.

In JupyterLab, the path is relative to the server (where you started JupyterLab) and you need to prefix the path with "files/".

Attributes
----------

.. autoclass:: ipyleaflet.leaflet.LocalTileLayer
   :members:
