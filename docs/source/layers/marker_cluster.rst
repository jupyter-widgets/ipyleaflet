Marker Cluster
==============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Marker, MarkerCluster

    m = Map(center=(50, 0), zoom=5)

    marker1 = Marker(location=(48, -2))
    marker2 = Marker(location=(50, 0))
    marker3 = Marker(location=(52, 2))

    marker_cluster = MarkerCluster(
        markers=(marker1, marker2, marker3)
    )

    m.add(marker_cluster);

    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.MarkerCluster
   :members:
