Heatmap
=======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Heatmap
    from random import uniform
    m = Map(center=(0, 0), zoom=2)

    heatmap = Heatmap(
        locations=[[uniform(-80, 80), uniform(-180, 180), uniform(0, 1000)] for i in range(1000)],
        radius=20
    )

    m.add_layer(heatmap);

    m


Attributes
----------

==============    ===================================================================    ====
Attribute         Default Value                                                          Doc
==============    ===================================================================    ====
locations         []                                                                     List of center locations
min_opacity       0.05                                                                   Minimum opacity the heat will start at
max_zoom          18                                                                     Zoom level where max intensity is reached
max               1.0                                                                    Maximum point intensity
radius            25.0                                                                   Radius of each "point" of the heatmap
blur              15.0                                                                   Amount of blur
gradient          {0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red'}     Color gradient config
==============    ===================================================================    ====

