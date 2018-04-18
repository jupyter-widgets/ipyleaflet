.. raw:: html
    :file: embed_widgets/image_video_overlay.html

Image overlay and Video overlay
===============================

Example
-------

.. code::

    from ipyleaflet import Map, VideoOverlay

    m = Map(center=(25, -115), zoom=4)

    video = VideoOverlay(
        url="https://www.mapbox.com/bites/00188/patricia_nasa.webm",
        bounds=((13, -130), (32, -100))
    )

    m.add_layer(video);
    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
    "model_id": "87d4292e2f214b97913a846cd527e8e5",
    "version_major": 2,
    "version_minor": 0
    }
    </script>

Attributes
----------

===========    ========================   ===
Attribute      Default Value              Doc
===========    ========================   ===
url            ""                         Url to the footage
bounds         ((0.0, 0.0), (0.0, 0.0))   SW and NE corners of the image
===========    ========================   ===
