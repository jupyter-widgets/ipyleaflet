Polygon/Multipolygon
====================


Example Polygon
---------------
You can easily create a ``Polygon`` providing the list of vertex locations (in lat/lng).


.. jupyter-execute::

    from ipyleaflet import Map, Polygon

    polygon = Polygon(
        locations=[(42, -49), (43, -49), (43, -48)],
        color="green",
        fill_color="green"
    )

    m = Map(center=(42.5531, -48.6914), zoom=6)
    m.add_layer(polygon);

    m

Because the ``Polygon`` an interactive widget, you can dynamically update the locations/color from Python, and you will see updated on the ``Map``.

Example Polygon with holes
--------------------------

You can define holes in your ``Polygon`` by using nested lists of vertex locations.

.. jupyter-execute::

    from ipyleaflet import Map, Polygon

    polygon = Polygon(
        locations= [
            [(37, -109.05), (41, -109.03), (41, -102.05), (37, -102.04)],
            [(37.29, -108.58), (40.71, -108.58), (40.71, -102.50), (37.29, -102.50)]
        ],
        color="green",
        fill_color="green"
    )

    m = Map(center=(37.5531, -109.6914), zoom=5)
    m.add_layer(polygon);

    m


Example MultiPolygon
--------------------

.. jupyter-execute::

    from ipyleaflet import Map, Polygon

    multipolygon = Polygon(
        locations=[
            [(42, -49), (43, -49), (43, -48)],
            [(44,-49), (43, -50), (44,-50)]
        ],
        color="green",
        fill_color="green"
    )

    m = Map(center=(42.5531, -48.6914), zoom=6)
    m.add_layer(multipolygon);

    m


Example Editable Polygon
------------------------

If ``transform`` is set to ``True``, you can dynamically edit the polygon with the mouse.

.. jupyter-execute::

    from ipyleaflet import Map, Polygon

    polygon = Polygon(
        locations=[(42, -49), (43, -49), (43, -48)],
        color="green",
        fill_color="green",
        transform=True
    )

    m = Map(center=(42.5531, -48.6914), zoom=6)
    m.add_layer(polygon);

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.Polygon
   :members:
