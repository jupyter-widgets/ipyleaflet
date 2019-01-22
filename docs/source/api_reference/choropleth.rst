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

Attributes
----------

============   ===
Attribute      Doc
============   ===
geo_data       Data dictionary
choro_data     Choropleth data dictionary
value_min      Color scale minimum value
value_max      Color scale maximum value
colormap       Map of color from branca

============   ===
