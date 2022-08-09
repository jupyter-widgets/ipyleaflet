Layer-Like Objects
==================

:class:`ipyleaflet.Map`'s :func:`ipyleaflet.Map.add` method supports
"layer-like" objects; meaning any object with an ``as_leaflet_layer`` method.
This interface can be especially useful for downstream developers who want
their users to more easily be able to add thier objects to an
:class:`ipyleaflet.Map`.

Example
-------

Downstream objects should implement an ``as_leaflet_layer`` method that returns
an ``ipyleaflet`` type capable of being added to the ``Map``.

Here is a simple example of creating a custom data class to hold heatmap data
(coordinates with some numerical value).


.. jupyter-execute::

  import numpy as np


  class MyHeatMap:
      def __init__(self, points, values, radius=20):
          self.points = points
          self.values = values
          self.radius = 20

      @property
      def data(self):
          return np.column_stack((self.points, self.values))

      def as_leaflet_layer(self):
          from ipyleaflet import Heatmap
          return Heatmap(
              locations=self.data.tolist(),
              radius=self.radius,
          )

We can now use that custom data class and because it has an
``as_leaflet_layer`` interface, we can pass the object directly to
:func:`ipyleaflet.Map.add`.


.. jupyter-execute::

  from ipyleaflet import Map

  n = 1000
  data = MyHeatMap(
      np.random.uniform(-80, 80, (n, 2)),
      np.random.uniform(0, 1000, n),
  )

  m = Map(center=(0, 0), zoom=2)
  m.add(data)
  m


External Examples
-----------------

The following external libraries are working to implement this new interface

- `localtileserver <https://github.com/banesullivan/localtileserver>`_: a dynamic tile server built for visualizing large geospatial images/rasters with ipyleaflet.
- `xarray-leaflet <https://github.com/davidbrochart/xarray_leaflet>`_: an xarray extension for tiled map plotting, based on ipyleaflet.
