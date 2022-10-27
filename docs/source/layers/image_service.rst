Image Service
=============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, ImageService, basemaps

    im = ImageService(
        url='https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer',
        rendering_rule={"rasterFunction":"Pansharpened Enhanced with DRA"},
        format='jpgpng',
        attribution='United States Geological Survey (USGS), National Aeronautics and Space Administration (NASA)'
    )

    m = Map(basemap=basemaps.Esri.WorldTopoMap, center=(47.655548, -122.303200), zoom=12)

    m.add(im)

    m

Usage
-----

By default, options like ``format``, ``band_ids``, ``time``, ``rendering_rule`` are appended to the request URL when making the image service layer request.

Attributes
----------

.. autoclass:: ipyleaflet.leaflet.ImageService
   :members:
