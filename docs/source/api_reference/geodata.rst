GeoData
=======

``GeoData`` is an ``ipyleaflet`` class that allows you to visualize a `GeoDataFrame
<http://geopandas.org/data_structures.html>`_ on the Map.


Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, GeoData, basemaps, LayersControl
    import geopandas
    import json

    countries = geopandas.read_file(geopandas.datasets.get_path('naturalearth_lowres'))
    rivers = geopandas.read_file("https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/physical/ne_10m_rivers_lake_centerlines.zip")

    m = Map(center=(52.3,8.0), zoom = 3, basemap= basemaps.Esri.WorldTopoMap)

    geo_data = GeoData(geo_dataframe = countries,
                       style={'color': 'black', 'fillColor': '#3366cc', 'opacity':0.05, 'weight':1.9, 'dashArray':'2', 'fillOpacity':0.6},
                       hover_style={'fillColor': 'red' , 'fillOpacity': 0.2},
                       name = 'Countries')

    rivers_data = GeoData(geo_dataframe = rivers,
                       style={'color': 'purple', 'opacity':3, 'weight':1.9, 'dashArray':'2', 'fillOpacity':0.6},
                       hover_style={'fillColor': 'red' , 'fillOpacity': 0.2},
                       name = 'Rivers')

    m.add_layer(rivers_data)
    m.add_layer(geo_data)
    m.add_control(LayersControl())

    m


Attributes
----------

============   ==========================  ===========
Attribute      Doc                         Description
============   ==========================  ===========
geo_data       Data dictionary             GeoDataFrame
style          Style dictionary
hover_style    Hover style dictionary
============   ==========================  ===========
