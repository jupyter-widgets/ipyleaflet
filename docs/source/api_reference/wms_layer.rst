WMS Layer
=========

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, WMSLayer, basemaps

    wms = WMSLayer(
        url='http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
        layers='nexrad-n0r-900913',
        format='image/png',
        transparent=True,
        attribution='Weather data © 2012 IEM Nexrad'
    )

    m = Map(basemap=basemaps.CartoDB.Positron, center=(38.491, -95.712), zoom=4)

    m.add_layer(wms)

    m

Advanced usage
--------------

By default, options like ``layers``, ``format``, ``transparent`` are passed in the request URL. If your tiles provider needs
any extra parameter, you can define your own ``WMSLayer`` class which adds new parameters. For example, the following code
adds a ``time`` parameter to the request by defining a custom ``TimeWMSLayer``:

.. jupyter-execute::

    from traitlets import Unicode


    class TimeWMSLayer(WMSLayer):

        time = Unicode('').tag(sync=True, o=True)


    time_wms = TimeWMSLayer(
        url='https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r-t.cgi?',
        layers='nexrad-n0r-wmst',
        time='2005-08-29T13:00:00Z',
        format='image/png',
        transparent=True,
        attribution='Weather data © 2012 IEM Nexrad'
    )

    m2 = Map(basemap=basemaps.CartoDB.Positron, center=(30.661, -88.645), zoom=5)

    m2.add_layer(time_wms)

    m2


Because it is a widget, you can dynamically update WMS parameters from Python manually:

.. jupyter-execute::

    # This will redraw the layer dynamically
    time_wms.time = '2005-08-29T14:00'

Or from another widget like a slider: (Note that this example will not work in the documentation as there is no live Python kernel, but it will work in a Jupyter Notebook)

.. jupyter-execute::

    from ipywidgets import SelectionSlider

    time_options = [
        '13:00', '13:30',
        '14:00', '14:30',
        '15:00', '15:30',
        '16:00', '16:30'
    ]

    slider = SelectionSlider(description='Time:', options=time_options)

    def update_wms(change):
        time_wms.time = '2005-08-29T{}'.format(slider.value)

    slider.observe(update_wms, 'value')

    slider


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
layers            ""                                                                                    Comma-separated list of WMS layers to show
styles            ""                                                                                    Comma-separated list of WMS styles
format            "image/jpeg"                                                                          WMS image format (use `'image/png'` for layers with transparency)
transparent       False                                                                                 If `True`, the WMS service will return images with transparency
crs               ipyleaflet.projections.EPSG3857                                                       Projection used for this service.
===============   ===================================================================================   ===
