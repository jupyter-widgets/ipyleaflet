.. _basemaps-section:

Basemaps
========

You can find on this page the default basemaps available in ipyleaflet, of course you can use another provider creating
your own ``TileLayer`` layer.

.. note::

    If one map on this page is completely grey, please report it by opening an issue: https://github.com/jupyter-widgets/ipyleaflet/issues/new

.. jupyter-execute::

    from ipyleaflet import Map, basemaps

    center = [38.128, 2.588]
    zoom = 5

    Map(basemap=basemaps.OpenStreetMap.Mapnik, center=center, zoom=zoom)


.. jupyter-execute::


    Map(basemap=basemaps.OpenStreetMap.BlackAndWhite, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.OpenStreetMap.France, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.OpenStreetMap.HOT, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.OpenTopoMap, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Hydda.Full, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Hydda.Base, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Esri.WorldStreetMap, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Esri.DeLorme, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Esri.WorldTopoMap, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Esri.WorldImagery, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Esri.NatGeoWorldMap, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.HikeBike.HikeBike, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.MtbMap, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.CartoDB.Positron, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.CartoDB.DarkMatter, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ModisTerraTrueColorCR, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ModisTerraBands367CR, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ModisTerraBands721CR, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ModisAquaTrueColorCR, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ModisAquaBands721CR, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ViirsTrueColorCR, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.NASAGIBS.ViirsEarthAtNight2012, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Strava.All, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Strava.Ride, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Strava.Run, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Strava.Water, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Strava.Winter, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Stamen.Terrain, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Stamen.Toner, center=center, zoom=zoom)


.. jupyter-execute::

    Map(basemap=basemaps.Stamen.Watercolor, center=center, zoom=zoom)
