Marker
======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Marker

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=15)

    marker = Marker(location=center, draggable=False)
    m.add_layer(marker);

    m


Attributes
----------

=====================    =====================   ===
Attribute                Default Value           Doc
=====================    =====================   ===
location                 (0.0, 0.0)
z_index_offset           0
draggable                True                    Whether the marker is draggable with mouse/touch or not
keyboard                 True                    Whether the marker can be tabbed to with a keyboard and clicked by pressing enter
title                    ""                      Text for the browser tooltip that appear on marker hover (no tooltip by default)
alt                      ""                      Text for the `alt` attribute of the icon image (useful for accessibility)
rise_on_hover            False                   The z-index offset used for the `rise_on_hover` feature
opacity                  1.0
visible                  True
rise_offset              250                     The z-index offset used for the `rise_on_hover` feature
rotation_angle           0                       The rotation angle of the marker in degrees
rotation_origin          'bottom center'         The rotation origin of the marker
icon                     None                    The icon for the marker
=====================    =====================   ===

Methods
-------

==========    =====================================     ===
Method        Arguments                                 Doc
==========    =====================================     ===
on_move       Callable object                           Adds a callback on move event
==========    =====================================     ===
