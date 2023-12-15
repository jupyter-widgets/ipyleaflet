Choropleth
==========

Example
-------

.. jupyter-execute::

      import ipyleaflet
      import json
      import pandas as pd
      import os
      import requests
      from ipywidgets import link, FloatSlider
      from branca.colormap import linear

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

      unemployment =  dict(zip(unemployment['State'].tolist(), unemployment['Unemployment'].tolist()))

      layer = ipyleaflet.Choropleth(
          geo_data=geo_json_data,
          choro_data=unemployment,
          colormap=linear.YlOrRd_04,
          border_color='black',
          style={'fillOpacity': 0.8, 'dashArray': '5, 5'})

      m = ipyleaflet.Map(center = (43,-100), zoom = 4)
      m.add(layer)
      m


Usage
-----

The ``Choropleth`` takes ``geo_data`` and ``choro_data`` as arguments.

The ``geo_data`` is a `GeoJSON
<https://geojson.org>`_ dictionary, for `instance
<https://raw.githubusercontent.com/jupyter-widgets/ipyleaflet/master/examples/us-states.json>`_ :

.. code::

    {
        "type": "FeatureCollection",
        "features":[{
            "type":"Feature",
            "id":"AL",
            "properties":{"name":"Alabama"},
            "geometry":{
                "type":"Polygon",
                "coordinates": [[[-87.359296,35.00118]]] ...
            }
        }]
    }

The ``choro_data`` is a dictionary that maps an key to a float value, in order to build the colormap :

.. code::

    {'AL': 7.1,
     'AK': 6.8}


The ``Choropleth`` layer is then created specifying on which key the colormap is applied:

.. code::

    Choropleth(
        geo_data=geo_data,
        choro_data=choro_data,
        key_on='id'
    )


Other options for the colormap can be found by running ``linear`` in the notebook cell. Refer to the `Branca docs <https://python-visualization.github.io/branca/>`_ for more information about colormaps:

.. jupyter-execute::

    linear

Attributes
----------

.. autoclass:: ipyleaflet.leaflet.Choropleth
   :members: