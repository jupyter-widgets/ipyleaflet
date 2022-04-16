Tile Layer
==========

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles

    m = Map(center=(52.204793, 360.121558), zoom=9)

    dark_matter_layer = basemap_to_tiles(basemaps.CartoDB.DarkMatter)
    m.add_layer(dark_matter_layer)
    m


Usage
-----

Creating a ``TileLayer`` is straightforward, a dictionary containing basic tile layers is provided.
This dictionary is named ``basemaps``.

A ``TileLayer`` instance can be created using the ``basemap_to_tiles`` function, specifying the wanted map
(e.g. ``basemaps.CartoDB.DarkMatter``, ``basemaps.Strava.Winter``, ``basemaps.NASAGIBS.ModisTerraTrueColorCR``, ...).

Sometimes one could want to specify the date of the given images, for instance with NASA images:

.. code::

    nasa_layer = basemap_to_tiles(basemaps.NASAGIBS.ModisTerraTrueColorCR, "2018-04-08");
    m.add_layer(nasa_layer);

Attributes and methods
----------------------
Note that if you want to display a high resolution layer with a quite large zoom, you have to set ``max_zoom`` and ``max_native_zoom`` with equal value.
.. autoclass:: ipyleaflet.leaflet.TileLayer
   :members:

