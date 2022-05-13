Colormap Control
==============

Example
-------

.. jupyter-execute::

    import ipyleaflet
    from ipyleaflet import Map, ColormapControl, WidgetControl
    import json
    import requests
    import pandas as pd
    from branca.colormap import linear

    colormap_choice = linear.YlOrRd_04
    def load_data(url, filename, file_type):
          r = requests.get(url)
          with open(filename, 'w') as f:
              f.write(r.content.decode("utf-8"))
          with open(filename, 'r') as f:
              return file_type(f)

    geo_json_data = load_data(
          'https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/us-states.json',
          'us-states.json',
           json.load)

    unemployment = load_data(
          'https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/US_Unemployment_Oct2012.csv',
          'US_Unemployment_Oct2012.csv',
           pd.read_csv)

    data_unemployment =  dict(zip(unemployment['State'].tolist(), unemployment['Unemployment'].tolist()))



    layer = ipyleaflet.Choropleth(
        geo_data=geo_json_data,
        choro_data=data_unemployment,
        colormap=colormap_choice,
        style={"dashArray": "5, 5"}
    )

    m = ipyleaflet.Map(center = (43,-100), zoom = 4)
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
