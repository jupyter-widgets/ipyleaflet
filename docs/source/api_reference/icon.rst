.. raw:: html
    :file: embed_widgets/marker_icon.html

Icon
======

Example
-------

.. code::

    from ipyleaflet import Marker, Icon, Map

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=10)
    icon = Icon(icon_url='https://leafletjs.com/examples/custom-icons/leaf-green.png', icon_size=[38, 95], icon_anchor=[22,94])
    mark = Marker(location=center, icon=icon, rotation_angle=90, rotation_origin='22px 94px')
    m.add_layer(mark);

    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
        "version_major": 2,
        "version_minor": 0,
        "model_id": "f77b940a1b4942eda0e0b3e8f12e2106"
    }
    </script>

Attributes
----------

=====================    =====================   ===
Attribute                Default Value           Doc
=====================    =====================   ===
icon_url                 ''                      url for icon
shadow_url               None                    url for icon shadow
icon_size                (10, 10)                size icon will be rendered
shadow_size              (10, 10)                size icon shadow will be rendered
icon_anchor              (0, 0)                  anchor point of icon
shadow_anchor            (0, 0)                  anchor point of shadow
popup_anchor             (0, 0)                  anchor point of popup
=====================    =====================   ===
