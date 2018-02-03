ipyleaflet
==========

A Jupyter / Leaflet bridge enabling interactive maps in the Jupyter notebook.

![Screenshot](/screenshot.png)

Getting Started
---------------

### Try it online with [Binder](http://mybinder.org/)

[![Binder](http://mybinder.org/badge.svg)](http://mybinder.org:/repo/ellisonbg/ipyleaflet/notebooks/examples)

Installation
------------

Using pip:

```
$ pip install ipyleaflet
$ jupyter nbextension enable --py --sys-prefix ipyleaflet  # can be skipped for
notebook 5.3 and above
```

Using conda:

```
$ conda install -c conda-forge ipyleaflet
```

If you have JupyterLab, you will also need to install the JupyterLab extension:

```
$ jupyter labextension install jupyter-leaflet
```

For a development installation (requires npm):

```
$ git clone https://github.com/ellisonbg/ipyleaflet.git
$ cd ipyleaflet
$ pip install -e .
$ jupyter nbextension install --py --symlink --sys-prefix ipyleaflet
$ jupyter nbextension enable --py --sys-prefix ipyleaflet
```

Note for developers: the `--symlink` argument on Linux or OS X allows one to
modify the JavaScript code in-place. This feature is not available
with Windows.


