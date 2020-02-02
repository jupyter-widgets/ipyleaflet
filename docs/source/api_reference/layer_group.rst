Layer Group
===========

Example
-------

.. jupyter-execute::

    from ipyleaflet import (
        Map, basemaps, basemap_to_tiles,
        Circle, Marker, Rectangle, LayerGroup
    )

    toner = basemap_to_tiles(basemaps.Stamen.Toner)

    m = Map(layers=(toner, ), center=(50, 354), zoom=5)

    # Create some layers
    marker = Marker(location=(50, 354))
    circle = Circle(location=(50, 370), radius=50000, color="yellow", fill_color="yellow")
    rectangle = Rectangle(bounds=((54, 354), (55, 360)), color="orange", fill_color="orange")

    # Create layer group
    layer_group = LayerGroup(layers=(marker, circle))

    m.add_layer(layer_group)

    layer_group.add_layer(rectangle)

    layer_group.remove_layer(circle)

    m


Attributes
----------

==============    ================   ===
Attribute         Default Value      Doc
==============    ================   ===
layers            ()                 List of layers
==============    ================   ===

Methods
-------

==============    =====================================     ===
Method            Arguments                                 Doc
==============    =====================================     ===
add_layer         Layer instance                            Add a new layer to the group
remove_layer      Layer instance                            Remove a layer from the group
clear_layers                                                Remove all layers from the group
==============    =====================================     ===
