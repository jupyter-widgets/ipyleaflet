leaftletwidget
==============

An IPython Widget for Leaflet Maps.

To run from the IPython Notebook with an internet connection:

```python
from leafletwidget import Map
from leafletwidget import initialize_notebook
initialize_notebook()
```

To run without an internet connection, first install the JavaScript and CSS files
in `$HOME/.ipython/nbextensions` by running this script in the source tree of this repository:

```bash
python install-nbextension.py
```

Then call `initialize_notebook` as follows:


```python
from leafletwidget import Map
from leafletwidget import initialize_notebook
initialize_notebook(leaflet_url='/nbextensions/leaflet-0.7.2',
                    leaflet_draw_url='/nbextensions/leaflet.draw/0.2.3')
```

You will still need a network connection for map tiles. If you install those in
`$HOME/.ipython/nbextensions` as well, you can set a custom map tile URL patten using
something like the following:

```python
from leafletwidget import Map, TileLayer
from leafletwidget import initialize_notebook
t = TileLayer()
t.url = '/nbextensions/tiles/1.0.0/map/{z}/{x}/{y}.png'
m = Map(default_tiles=t)
```

