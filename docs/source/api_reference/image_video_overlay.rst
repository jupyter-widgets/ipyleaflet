Image overlay and Video overlay
===============================

Example ImageOverlay
--------------------

.. jupyter-execute::

    from ipyleaflet import Map, ImageOverlay

    m = Map(center=(25, -115), zoom=4)

    image = ImageOverlay(
        url="https://i.imgur.com/06Q1fSz.png",
        # url='../06Q1fSz.png',
        bounds=((13, -130), (32, -100))
    )

    m.add_layer(image);
    m


Example VideoOverlay
--------------------

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
url            ""                         An http url to the footage or a relative path to a local file (image/video). Note that absolute local paths are not supported. 
bounds         ((0.0, 0.0), (0.0, 0.0))   SW and NE corners of the image
===========    ========================   ===
