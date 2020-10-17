GeoData
=======

``GeoData`` is an ``ipyleaflet`` class that allows you to visualize a `GeoDataFrame
<http://geopandas.org/data_structures.html>`_  of polygons, lines, and points on the Map.


Examples
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

Points example:

.. jupyter-execute::

    from ipyleaflet import Map, GeoJSON, GeoData
    import geopandas, pandas as pd, numpy as np
    
    m = Map(center=(46.91, 7.43), zoom=15)
    
    numpoints = 10
    center = (7.43, 46.91)
    
    df = pd.DataFrame(
        {'Conc': 1 * np.random.randn(numpoints) + 17,
         'Longitude': 0.0004 * np.random.randn(numpoints) + center[0],
         'Latitude': 0.0004 * np.random.randn(numpoints) + center[1]})

    gdf = geopandas.GeoDataFrame(
        df, geometry=geopandas.points_from_xy(df.Longitude, df.Latitude))

    geo_data = GeoData(geo_dataframe = gdf,
        style={'color': 'black', 'radius':8, 'fillColor': '#3366cc', 'opacity':0.5, 'weight':1.9, 'dashArray':'2', 'fillOpacity':0.6},
        hover_style={'fillColor': 'red' , 'fillOpacity': 0.2},
        point_style={'radius': 5, 'color': 'red', 'fillOpacity': 0.8, 'fillColor': 'blue', 'weight': 3},
        name = 'Release')
    
    m.add_layer(geo_data)
    m



Attributes
----------

============   ==========================  ===========
Attribute      Doc                         Description
============   ==========================  ===========
geo_data       Data dictionary             GeoDataFrame
style          Style dictionary
hover_style    Hover style dictionary
point_style    Point decorations           Used to represent point data on the map as CircleMarkers.  If absent, points will be represented by Markers.
============   ==========================  ===========
