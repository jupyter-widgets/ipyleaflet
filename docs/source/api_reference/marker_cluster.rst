Marker Cluster
==============

Example
-------

.. code::

    from ipyleaflet import Map, Marker, MarkerCluster

    m = Map(center=(50, 354), zoom=5)

    marker1 = Marker(location=(50, 354))
    marker2 = Marker(location=(52, 356))
    marker3 = Marker(location=(48, 352))

    marker_cluster = MarkerCluster(
        markers=(marker1, marker2, marker3)
    )

    m.add_layer(marker_cluster);

    m

Attributes
----------

============   ================   ===
Attribute      Default Value      Doc
============   ================   ===
markers        ()                 Tuple of markers
============   ================   ===
