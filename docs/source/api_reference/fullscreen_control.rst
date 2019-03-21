.. raw:: html
    :file: embed_widgets/fullscreen_control.html

Fullscreen Control
==================

Example
-------

.. code::

    from ipyleaflet import Map, FullScreenControl

    m = Map(zoom=5, center=[51.64, -76.52])
    m.add_control(FullScreenControl())

    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
        "version_major": 2,
        "version_minor": 0,
        "model_id": "9c4473d2196f432eb47be766b13916e6"
    }
    </script>
