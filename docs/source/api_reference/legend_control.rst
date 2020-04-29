Legend Control
==============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, LegendControl
    mymap = Map(center=(-10,-45), zoom=4)
    a_legend = LegendControl({"low":"#FAA", "medium":"#A55", "High":"#500"}, name="Legend", position="bottomright")
    mymap.add_control(a_legend)
    mymap

.. jupyter-execute::

    # manipulate the legend

    # legend title
    a_legend.name = "Risk" ## set name
    a_legend.name # get name

    # legend content
    a_legend.legends = {"el1":"#FAA", "el2":"#A55", "el3":"#500"} #set content
    a_legend.legends # get content
    a_legend.add_legend_element("el5","#000") # add a legend element
    a_legend.remove_legend_element("el5") # remove a legend element


    # legend position
    a_legend.positionning ="topright" 
    a_legend.positionning # get current positionning

Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
legend              None               a dictionnary that represents the legend
title               "Legend"           LegendControl name
================    ================   ===
