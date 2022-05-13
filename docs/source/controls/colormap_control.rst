Colormap Control
==============

Example
-------

.. jupyter-execute::

    import ipyleaflet
    from ipyleaflet import Map, ColormapControl, WidgetControl
    import json
    import pandas as pd
    from branca.colormap import linear

    colormap_choice = linear.YlOrRd_04
    geo_json_data = json.load(open("us-states.json"))
    m = ipyleaflet.Map(center=(43, -100), zoom=10)
    unemployment = pd.read_csv("US_Unemployment_Oct2012.csv")
    data_unemployment = dict(
    zip(unemployment["State"].tolist(), unemployment["Unemployment"].tolist())
    )

    layer = ipyleaflet.Choropleth(
    geo_data=geo_json_data,
    choro_data=data_unemployment,
    colormap=colormap_choice,
    style={"dashArray": "5, 5"}
    )
    m.add_layer(layer)

    myColormapControl = ColormapControl(
        caption="Unemployment rate",
        colormap_choice=colormap_choice,
        value_min=layer.value_min,
        value_max=layer.value_max,
        position='topright',
        bg = 'transparent'
    )
    m.add_control(myColormapControl)
    m

Attributes and methods
----------------------

.. autoclass:: ipyleaflet.leaflet.ColormapControl
   :members:
