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

    m.add(image);
    m

Attributes
----------

.. autoclass:: ipyleaflet.leaflet.ImageOverlay
   :members:

Example VideoOverlay
--------------------

.. jupyter-execute::

    from ipyleaflet import Map, VideoOverlay

    m = Map(center=(25, -115), zoom=4)

    video = VideoOverlay(
        url="https://www.mapbox.com/bites/00188/patricia_nasa.webm",
        bounds=((13, -130), (32, -100))
    )

    m.add(video);
    m


Attributes
----------

.. autoclass:: ipyleaflet.leaflet.VideoOverlay
   :members:
