.. raw:: html
    :file: embed_widgets/awesome_icon.html

AwesomeIcon
===========

Font-Awesome icons for markers, see https://fontawesome.com/v4.7.0/icons for available icons.

Example
-------

.. code::

    from ipyleaflet import AwesomeIcon, Marker, Map

    center = (38.91342738235981, -77.03912909142674)

    icon1 = AwesomeIcon(
        name='bus',
        marker_color='red',
        icon_color='black',
        spin=False
    )

    marker1 = Marker(icon=icon1, location=(center[0], center[1] - 0.05))

    icon2 = AwesomeIcon(
        name='gear',
        marker_color='green',
        icon_color='darkgreen',
        spin=True
    )

    marker2 = Marker(icon=icon2, location=(center[0], center[1] + 0.05))

    m = Map(center=center, zoom=13)

    m.add_layer(marker1)
    m.add_layer(marker2)

    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
        "version_major": 2,
        "version_minor": 0,
        "model_id": "91eefec4ff454ce39a578507f70194c2"
    }
    </script>

Interactions
------------

Unlike other widgets in ipyleaflet, the ``AwesomeIcon`` widget is not dynamic. If you want to dynamically update the marker icon, you need to reassign the ``Marker.icon`` property with a new icon.

.. code::

    marker1.icon = AwesomeIcon(
        name='home',
        marker_color='blue',
        icon_color='black'
    )


Attributes
----------

=====================    =====================   ===
Attribute                Default Value           Doc
=====================    =====================   ===
name                     'home'                  Name of the Font-Awesome icon
marker_color             'blue'                  Marker background color
icon_color               'white'                 Icon color
spin                     False                   Whether the icon is spinning or not
=====================    =====================   ===
