DivIcon
======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Marker, DivIcon, Map

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=10)
    icon = DivIcon(html='foo bar', bg_pos=[0, 0], icon_size=[150, 150])
    mark = Marker(location=center, icon=icon)
    m.add_layer(mark);

    m


Attributes
----------

=====================    =====================   ===
Attribute                Default Value           Doc
=====================    =====================   ===
html                     ''                      Custom HTML code to put inside the div element,
bg_pos                   (0, 0)                  Optional relative position of the background, in pixels.
icon_size                (10, 10)                size icon will be rendered
icon_anchor              (0, 0)                  anchor point of icon
popup_anchor             (0, 0)                  anchor point of popup
=====================    =====================   ===
