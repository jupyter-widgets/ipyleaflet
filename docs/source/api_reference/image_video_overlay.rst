Image overlay and Video overlay
===============================

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, VideoOverlay

    m = Map(center=(25, -115), zoom=4)

    video = VideoOverlay(
        url="https://www.mapbox.com/bites/00188/patricia_nasa.webm",
        bounds=((13, -130), (32, -100))
    )

    m.add_layer(video);
    m


Attributes
----------

===========    ========================   ===
Attribute      Default Value              Doc
===========    ========================   ===
url            ""                         Url to the footage
bounds         ((0.0, 0.0), (0.0, 0.0))   SW and NE corners of the image
===========    ========================   ===
