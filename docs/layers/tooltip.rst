Tooltip
=====

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, Tooltip, Marker, Polygon, Circle

    m = Map(center=(51.505,-0.09), zoom=13)

    standalone_tooltip = Tooltip(
        location=[51.5, -0.09], 
        content="Hello world!<br />This is a nice tooltip.",
        offset=[-30,50], # Offset in pixels
        permanent=False,  # The default is False, in which case you can remove the tooltip by clicking on it. 
        direction='bottom', # Default is 'auto'
    )

    marker_tooltip = Tooltip(
        content="I'm a marker tooltip! 👋<br>Appears on hover.",
    )

    marker = Marker(
        location=[51.5, -0.09], 
        draggable=False,
        tooltip=marker_tooltip,
    )

    polygon = Polygon(
        locations= [
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
    ])

    polygon_tooltip = Tooltip(
        content = "Polygon's Permanent Tooltip 🗺️",
        permanent = True,
        direction = 'center', # Centers the tooltip on the polygon   
    )

    polygon.tooltip = polygon_tooltip

    circle = Circle(
        location = [51.515, -0.1],
        radius = 500,
        color = 'green',
        fillColor = '#0f3', 
        fillOpacity = 0.5,
        tooltip = Tooltip(
            content = "Sticky Tooltip here! 📍<br>Stays with the mouse.",
            sticky = True,
        )
    )

    m.add(standalone_tooltip)
    m.add(marker)
    m.add(polygon)
    m.add(circle)

    m


Attributes and methods
----------------------

.. autoclass:: ipyleaflet.leaflet.Tooltip
   :members:
