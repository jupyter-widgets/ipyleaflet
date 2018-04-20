.. raw:: html
    :file: embed_widgets/wms_layer.html

WMS layer
=========

Example
-------

.. code::

    from ipyleaflet import Map, WMSLayer

    wms = WMSLayer(
        url="https://demo.boundlessgeo.com/geoserver/ows?",
        layers="nasa:bluemarble"
    )

    m = Map(layers=(wms, ), center=(42.5531, -48.6914), zoom=3)

    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
        "model_id": "768133089a2b4e56bb9a751b4a0ae077",
        "version_major": 2,
        "version_minor": 0
    }
    </script>

Attributes
----------

===============   ===================================================================================   ===
Attribute         Default Value                                                                         Doc
===============   ===================================================================================   ===
url               "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
min_zoom          0
max_zoom          18
tile_size         256
attribution       "Map data (c) <a href=\'https://openstreetmap.org\'>OpenStreetMap</a> contributors"
detect_retina     False
opacity           1.0
visible           True
service           "WMS"
request           "GetMap"
layers            ""                                                                                    Comma-separated list of WMS layers to show
styles            ""                                                                                    Comma-separated list of WMS styles
format            "image/jpeg"                                                                          WMS image format (use `'image/png'` for layers with transparency)
transparent       False                                                                                 If `True`, the WMS service will return images with transparency
version           "1.1.1"                                                                               Version of the WMS service to use
crs               ""
===============   ===================================================================================   ===
