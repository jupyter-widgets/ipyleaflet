Map
===

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles

    m = Map(
        basemap=basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-04-08"),
        center=(52.204793, 360.121558),
        zoom=4
    )

    m

Usage
-----
You can find the list of available basemaps in the :ref:`basemaps-section` page.

You can add multiple layers and controls to the map, using the ``add_`` methods. All those layers and controls are widgets themselves. So you can dynamically update their attributes from Python or by interacting with the map on the page (see :ref:`usage-section`)

.. jupyter-execute::

    from ipyleaflet import Map, Marker, basemaps, basemap_to_tiles

    m = Map(
        basemap=basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-04-08"),
        center=(52.204793, 360.121558),
        zoom=4
    )

    m.add_layer(Marker(location=(52.204793, 360.121558)))

    m

As a Jupyter interactive widget, the layout of the ``Map`` object is specified by a Layout attribute. See `Layout and Styling of Jupyter widgets <https://ipywidgets.readthedocs.io/en/latest/examples/Widget%20Styling.html/>`_ for details.

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles
    from ipywidgets import Layout

    m = Map(
        basemap=basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2017-04-08"),
        center=(52.204793, 360.121558),
        zoom=4,
        layout=Layout(width='80%', height='500px')
    )

    m.add_layer(Marker(location=(52.204793, 360.121558)))

    m

You can use multiple basemaps my manually creating ``TileLayer`` objects and passing them to the ``Map`` constructor. (see :ref:`TileLayer Usage<Tile Layer Basemap>`)

Save to HTML
------------

You can save the ``Map`` and all its layers and controls to an HTML page using the ``save`` method:

.. code::

    m.save('my_map.html', title='My Map')

.. note::
    The saved file is a static HTML page, so there is no possible interaction with Python anymore. This means that all the Python callbacks you defined (`e.g.` on marker move) cannot be executed. If you want to serve the ``Map`` widget to an HTML page while keeping a Python kernel alive on the server, you might want to look at `Voilà <https://voila.readthedocs.io>`_.


Attributes and methods
----------------------

.. autoclass:: ipyleaflet.Map
   :members:

