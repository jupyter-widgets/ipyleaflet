Legend Control
==============

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, LegendControl

    m = Map(center=(-10,-45), zoom=4)

    legend = LegendControl({"low":"#FAA", "medium":"#A55", "High":"#500"}, title="Legend", position="bottomright")
    m.add(legend)

    m

.. jupyter-execute::

    # Manipulate the legend

    # Set/Get legend title
    legend.title = "Risk"  # Set title
    legend.title  # Get title

    # Set/Get legend content
    legend.legend = {"el1":"#FAA", "el2":"#A55", "el3":"#500"}  # Set content
    legend.legend  # Get content

    legend.add_legend_element("el5","#000")  # Add a legend element
    legend.remove_legend_element("el5")  # Remove a legend element

    # legend position
    legend.position = "topright"  # Set position
    legend.position  # Get current position

Attributes and methods
----------------------

.. autoclass:: ipyleaflet.leaflet.LegendControl
   :members:
