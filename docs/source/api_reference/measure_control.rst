Measure Control
===============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, MeasureControl, basemaps

    m = Map(center=(43.0327, 6.0232), zoom=9, basemap=basemaps.Hydda.Full)

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


Attributes
----------

=====================    ==========================================================================   ===
Attribute                Default Value                                                                Doc
=====================    ==========================================================================   ===
position                 "topright"                                                                   Position of the control on the Map, possible values are topleft, topright, bottomleft or bottomright
primary_length_unit      "feet"                                                                       Primary length unit, possible values are feet, meters, miles, kilometers or any user defined length unit
secondary_length_unit    None                                                                         Secondary length unit, possible values are None, feet, meters, miles, kilometers or any user defined length unit
primary_area_unit        "acres"                                                                      Primary area unit, possible values are acres, hectares, sqfeet, sqmeters, sqmiles or any user defined area unit
secondary_area_unit      None                                                                         Secondary area unit, possible values are None, acres, hectares, sqfeet, sqmeters, sqmiles or any user defined area unit
active_color             "#ABE67E"                                                                    Color of the currently drawn area
completed_color          "#C8F2BE"                                                                    Color of the completed areas
popup_options            {'className': 'leaflet-measure-resultpopup', 'autoPanPadding': [10, 10]}
capture_z_index          10000                                                                        Z-index of the marker used to capture measure clicks. Set this value higher than the z-index of all other map layers to disable click events on other layers while a measurement is active.
=====================    ==========================================================================   ===

Methods
-------

=================    =====================================     ===
Method               Arguments                                 Doc
=================    =====================================     ===
add_length_unit      name, factor, decimals=0                  Adds a length unit with a name, a factor (factor to apply when converting to this unit. Length in meters will be multiplied by this factor), and an optional number of displayed decimals
add_area_unit        name, factor, decimals=0                  Adds a area unit with a name, a factor (factor to apply when converting to this unit. Area in sqmeters will be multiplied by this factor), and an optional number of displayed decimals
=================    =====================================     ===
