Measure Control
===============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, MeasureControl, basemaps

    m = Map(center=(43.0327, 6.0232), zoom=9, basemap=basemaps.OpenStreetMap.Mapnik)

    measure = MeasureControl(
        position='bottomleft',
        active_color = 'orange',
        primary_length_unit = 'kilometers'
    )
    m.add_control(measure)

    measure.completed_color = 'red'

    measure.add_length_unit('yards', 1.09361, 4)
    measure.secondary_length_unit = 'yards'

    measure.add_area_unit('sqyards', 1.19599, 4)
    measure.secondary_area_unit = 'sqyards'

    m


Attributes and methods
----------------------

.. autoclass:: ipyleaflet.leaflet.MeasureControl
   :members: