# ipyleaflet

[![Documentation](http://readthedocs.org/projects/ipyleaflet/badge/?version=latest)](https://ipyleaflet.readthedocs.io/en/latest/?badge=latest)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/jupyter-widgets/ipyleaflet/stable?urlpath=lab%2Ftree%2Fexamples)
[![Join the Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jupyter-widgets/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Downloads](https://pepy.tech/badge/ipyleaflet/month)](https://pepy.tech/project/ipyleaflet/month)

A Jupyter / Leaflet bridge enabling interactive maps in the Jupyter notebook.

## Usage

### Selecting a basemap for a leaflet map:

![Basemap Screencast](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/basemap.gif)

### Loading a geojson map:

![GeoJSON Screencast](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/geojson.gif)

### Making use of leafletjs primitives:

![Primitives Screencast](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/primitives.gif)

### Using the splitmap control:

![Splitmap Screencast](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/splitmap.gif)

### Displaying velocity data on the top of a map:

![Velocity Screencast](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/velocity.gif)

### Choropleth layer:

![Choropleth Screencast](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/choropleth.gif)

### Widget control

![Widget Control](https://github.com/jupyter-widgets/ipyleaflet/blob/master/python/ipyleaflet/widget_control.gif)

## Installation

Using conda:

```
conda install -c conda-forge ipyleaflet
```

Using pip:

```
pip install ipyleaflet
```

## Installation from sources

For a development installation (requires yarn, you can install it with `conda install -c conda-forge yarn`):

```
git clone https://github.com/jupyter-widgets/ipyleaflet.git
cd ipyleaflet
(cd python/jupyter_leaflet; pip install -e .)
(cd python/ipyleaflet; pip install -e .)
```

For developing with JupyterLab:

```
jupyter labextension develop --overwrite jupyter_leaflet
```

## Documentation

To get started with using `ipyleaflet`, check out the full documentation

https://ipyleaflet.readthedocs.io/

## License

We use a shared copyright model that enables all contributors to maintain the
copyright on their contributions.

This software is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.

## Related projects

The `ipyleaflet` repository includes the `jupyter-leaflet` npm package, which
is a front-end component, and the `ipyleaflet` python package which is the
backend for the Python Jupyter kernel.

Similarly, the [`xleaflet`](https://github.com/jupyter-xeus/xleaflet/) project
provides a backend to `jupyter-leaflet` for the "xeus-cling" C++ Jupyter
kernel.

![Xleaflet Screencast](xleaflet.gif)
