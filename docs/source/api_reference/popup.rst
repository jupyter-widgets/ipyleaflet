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


Attributes
----------

=====================    =====================   ===
Attribute                Default Value           Doc
=====================    =====================   ===
location                 (0.0, 0.0)
child                                            Content of the popup
max_width                300                     Max width of the popup, in pixels
min_width                50                      Min width of the popup, in pixels
max_height                                       If set, creates a scrollable container of the given height inside a popup if its content exceeds it
auto_pan                 True                    Set it to `False` if you don't want the map to do panning animation to fit the opened popup
auto_pan_padding         (5, 5)
keep_in_view             False                   Set it to `True` if you want to prevent users from panning the popup off of the screen while it is open
close_button             True                    Controls the presence of a close button in the popup
close_on_escape_key      True                    Set it to `False` if you want to override the default behavior of the ESC key for closing of the popup
class_name               ""                      A custom CSS class name to assign to the popup
=====================    =====================   ===
