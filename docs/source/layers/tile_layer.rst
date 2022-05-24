Tile Layer
==========

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles

    m = Map(center=(52.204793, 360.121558), zoom=9)

    dark_matter_layer = basemap_to_tiles(basemaps.CartoDB.DarkMatter)
    m.add(dark_matter_layer)
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
    m.add(nasa_layer);

.. _Tile Layer Basemap:

To use multiple base maps and the built in base map switching in ``LayerControl``, it is possible to create the desired  ``TileLayer`` objects and set ``base`` to ``True``.
These layers can then be passed in an array to ``Map(layers)``:

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles
    from ipyleaflet import LayersControl

    mapnik = basemap_to_tiles(basemaps.OpenStreetMap.Mapnik)
    mapnik.base = True
    toner = basemap_to_tiles(basemaps.Stamen.Toner)
    toner.base = True

    m = Map(layers=[mapnik, toner], center=(52.204793, 360.121558), zoom=9)

    # use the LayersControl to switch basemaps
    m.add(LayersControl())
    m

Attributes and methods
----------------------

Note that if you want to display a high resolution layer with a quite large zoom, you have to set ``max_zoom`` and ``max_native_zoom`` with equal value.

.. autoclass:: ipyleaflet.leaflet.TileLayer
   :members:

