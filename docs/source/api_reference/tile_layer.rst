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

Attributes
----------

===============    ===================================================================================
Attribute          Default Value
===============    ===================================================================================
url                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
min_zoom           0
max_zoom           18
min_native_zoom    0
max_native_zoom    18
tile_size          256
attribution        "Map data (c) <a href=\'https://openstreetmap.org\'>OpenStreetMap</a> contributors"
detect_retina      False
opacity            1.0
visible            True
no_wrap            False
show_loading       False
loading            False (dynamically updated)
===============    ===================================================================================
