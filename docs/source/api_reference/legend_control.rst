Legend Control
==============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, LegendControl

    m = Map(center=(-10,-45), zoom=4)

    legend = LegendControl({"low":"#FAA", "medium":"#A55", "High":"#500"}, name="Legend", position="bottomright")
    m.add_control(legend)

    m

.. jupyter-execute::

    # Manipulate the legend

    # Set/Get legend title
    legend.name = "Risk"  # Set name
    legend.name  # Get name

    # Set/Get legend content
    legend.legends = {"el1":"#FAA", "el2":"#A55", "el3":"#500"}  # Set content
    legend.legends  # Get content

    legend.add_legend_element("el5","#000")  # Add a legend element
    legend.remove_legend_element("el5")  # Remove a legend element

    # legend position
    legend.position = "topright"  # Set position
    legend.position  # Get current position

Attributes
----------

================    ================   ===
Attribute           Default Value      Doc
================    ================   ===
position            'topleft'          Position of the control, can be 'bottomleft', 'bottomright', 'topleft', or 'topright'
legend              None               A dictionary containing the name->color mapping that represents the legend
title               'Legend'           Legend name
================    ================   ===
