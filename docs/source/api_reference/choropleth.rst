.. raw:: html
    :file: embed_widgets/choropleth.html

Choropleth
==========

Example
-------

.. code::

      import ipyleaflet
      import json
      import pandas as pd
      import os
      import requests
      from ipywidgets import link, FloatSlider
      from branca.colormap import linear

      def load_data(url, nom_fichier, type_fichier):
          r = requests.get(url)
          with open(nom_fichier, 'w') as f:
              f.write(r.content.decode("utf-8"))
          with open(nom_fichier, 'r') as f:
              return type_fichier(f)

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
      m.add_layer(layer)
      m

.. raw:: html

  <script type="application/vnd.jupyter.widget-view+json">
  {
  "version_major": 2,
  "version_minor": 0,
  "model_id": "fddc6f2fbe9e46f6bfc2b3a5daa96c20"
  }
  </script>
  <div style ="height:30px;"> </div>


Information
-----------

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

The ``choro_data`` is a dictionary that takes ``'id'`` from ``'features'`` as key and float as value, in order to build the colormap :

.. code::

    {'AL': 7.1,
     'AK': 6.8}


Attributes
----------

============   ==========================  ===========
Attribute      Doc                         Description
============   ==========================  ===========
geo_data       Data dictionary             GeoJSON dictionary
choro_data     Choropleth data dictionary  Dictionary id/float
value_min      Color scale minimum value
value_max      Color scale maximum value
colormap       Map of color from branca
============   ==========================  ===========
