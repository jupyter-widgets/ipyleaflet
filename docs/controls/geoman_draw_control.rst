Geoman Draw Control
===================

``GeomanDrawControl`` allows one to draw various shapes on the map.
The drawing functionality on the front-end is provided by `geoman <https://geoman.io/>`_.

The following shapes are supported:

- marker
- circlemarker
- circle
- polyline
- rectangle
- polygon
- text

Additionally, there are modes that allow editing of previously drawn shapes:

- edit
- drag
- remove
- cut
- rotate

To have a drawing tool active on the map, pass it a non-empty dictionary with the desired options, see
`geoman documentation <https://www.geoman.io/docs/modes/draw-mode#customize-style>`_ for details.

By default, editing is disabled for shapes created programmatically as described in the :ref:`layers-section` page.
However, adding ``pm_ignore=False`` to shapes allows them to be modified using the control.

Example
-------
.. jupyter-execute::

    from ipyleaflet import Map, GeomanDrawControl, Circle

    m = Map(center=(50, 354), zoom=5)

    draw_control = GeomanDrawControl()
    draw_control.polyline =  {
        "pathOptions": {
            "color": "#6bc2e5",
            "weight": 8,
            "opacity": 1.0
        }
    }
    draw_control.polygon = {
        "pathOptions": {
            "fillColor": "#6be5c3",
            "color": "#6be5c3",
            "fillOpacity": 1.0
        }
    }
    draw_control.circlemarker = {
        "pathOptions": {
            "fillColor": "#efed69",
            "color": "#efed69",
            "fillOpacity": 0.62
        }
    }
    draw_control.rectangle = {
        "pathOptions": {
            "fillColor": "#fca45d",
            "color": "#fca45d",
            "fillOpacity": 1.0
        }
    }

    m.add(draw_control)

    circle = Circle(location=(50, 352), radius=100000, color="blue")
    m.add(circle)

    editable_circle = Circle(location=(50, 356), radius=100000, pm_ignore=False, color="red")
    m.add(editable_circle)

    m

Methods
-------

.. autoclass:: ipyleaflet.leaflet.GeomanDrawControl
   :members:
