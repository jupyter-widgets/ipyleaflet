Heatmap
=======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Heatmap
    from random import uniform
    m = Map(center=(0, 0), zoom=2)

    heatmap = Heatmap(
        locations=[[uniform(-80, 80), uniform(-180, 180), uniform(0, 1000)] for i in range(1000)],
        radius=20
    )

    m.add_layer(heatmap);

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.Heatmap
   :members:

