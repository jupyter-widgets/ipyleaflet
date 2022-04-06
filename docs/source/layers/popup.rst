Popup
=====

Example
-------

.. jupyter-execute::

    from ipywidgets import HTML

    from ipyleaflet import Map, Marker, Popup

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=9, close_popup_on_click=False)

    marker = Marker(location=(52.1, 359.9))
    m.add_layer(marker)

    message1 = HTML()
    message2 = HTML()
    message1.value = "Try clicking the marker!"
    message2.value = "Hello <b>World</b>"
    message2.placeholder = "Some HTML"
    message2.description = "Some HTML"

    # Popup with a given location on the map:
    popup = Popup(
        location=center,
        child=message1,
        close_button=False,
        auto_close=False,
        close_on_escape_key=False
    )
    m.add_layer(popup)

    # Popup associated to a layer
    marker.popup = message2

    m


Attributes and methods
----------------------

.. autoclass:: ipyleaflet.leaflet.Popup
   :members:
