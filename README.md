# ipyleaflet

[![Documentation](http://readthedocs.org/projects/ipyleaflet/badge/?version=latest)](https://ipyleaflet.readthedocs.io/en/latest/?badge=latest)
[![Binder](https://img.shields.io/badge/launch-binder-brightgreen.svg)](https://mybinder.org/v2/gh/jupyter-widgets/ipyleaflet/0.8.1?filepath=examples)
[![Join the Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jupyter-widgets/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A Jupyter / Leaflet bridge enabling interactive maps in the Jupyter notebook.

## Docs

See [ipyleaflet.readthedocs.io](https://ipyleaflet.readthedocs.io/en/latest/?badge=latest)

## Usage

Selecting a basemap for a leaflet map:

![Basemap Screencast](basemap.gif)

Loading a geojson map:

![GeoJSON Screencast](geojson.gif)

Making use of leafletjs primitives:

![Primitives Screencast](primitives.gif)

Using the splitmap control:

![Splitmap Screencast](splitmap.gif)

Displaying velocity data on the top of a map:

![Velocity Screencast](velocity.gif)

## Installation

Using conda:

```
$ conda install -c conda-forge ipyleaflet
```

Using pip:

```
$ pip install ipyleaflet
$ jupyter nbextension enable --py --sys-prefix ipyleaflet  # can be skipped for
notebook 5.3 and above
```

If you have JupyterLab, you will also need to install the JupyterLab extension:

```
$ jupyter labextension install jupyter-leaflet
```

## Installation from sources

For a development installation (requires npm):

```
$ git clone https://github.com/jupyter-widgets/ipyleaflet.git
$ cd ipyleaflet
$ pip install -e .
$ jupyter nbextension install --py --symlink --sys-prefix ipyleaflet
$ jupyter nbextension enable --py --sys-prefix ipyleaflet
```

Note for developers: the `--symlink` argument on Linux or OS X allows one to
modify the JavaScript code in-place. This feature is not available
with Windows.

## License

We use a shared copyright model that enables all contributors to maintain the
copyright on their contributions.

This software is licensed under the BSD-3-Clause license. See the [LICENSE](LICENSE) file for details.

## Related projects

The `ipyleaflet` repository includes the `jupyter-leaflet` npm package, which
is a front-end component, and the `ipyleaflet` python package which is the
backend for the Python Jupyter kernel.

Similarly, the [`xleaflet`](https://github.com/QuantStack/xleaflet/) project
provides a backend to `jupyter-leaflet` for the "xeus-cling" C++ Jupyter
kernel.

![Xleaflet Screencast](xleaflet.gif)
