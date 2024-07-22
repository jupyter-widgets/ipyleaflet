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

Example
-------
.. jupyter-execute::

    from ipyleaflet import Map, GeomanDrawControl

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

    m

Methods
-------

.. autoclass:: ipyleaflet.leaflet.GeomanDrawControl
   :members:
