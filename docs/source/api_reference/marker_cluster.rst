.. raw:: html
    :file: embed_widgets/marker_cluster.html


Marker Cluster
==============

Example
-------

.. code::

    from ipyleaflet import Map, Marker, MarkerCluster

    m = Map(center=(50, 0), zoom=5)

    marker1 = Marker(location=(48, -2))
    marker2 = Marker(location=(50, 0))
    marker3 = Marker(location=(52, 2))

    marker_cluster = MarkerCluster(
        markers=(marker1, marker2, marker3)
    )

    m.add_layer(marker_cluster);

    m

.. raw:: html


    <script type="application/vnd.jupyter.widget-view+json">
    {
    "model_id": "28d4976eec044342ab3cbb2fbec5cc82",
    "version_major": 2,
    "version_minor": 0
    }
    </script>
    <div style ="height:30px;"> </div>




Attributes
----------

============   ================   ===
Attribute      Default Value      Doc
============   ================   ===
markers        ()                 Tuple of markers
============   ================   ===
