Draw Control
============

The ``DrawControl`` allows one to draw shapes on the map such as ``Rectangle`` ``Circle`` or lines.

.. jupyter-execute::

    from ipyleaflet import Map, basemaps, basemap_to_tiles, DrawControl

    watercolor = basemap_to_tiles(basemaps.Stamen.Watercolor)

    m = Map(layers=(watercolor, ), center=(50, 354), zoom=5)

    draw_control = DrawControl()
    draw_control.polyline =  {
        "shapeOptions": {
            "color": "#6bc2e5",
            "weight": 8,
            "opacity": 1.0
        }
    }
    draw_control.polygon = {
        "shapeOptions": {
            "fillColor": "#6be5c3",
            "color": "#6be5c3",
            "fillOpacity": 1.0
        },
        "drawError": {
            "color": "#dd253b",
            "message": "Oups!"
        },
        "allowIntersection": False
    }
    draw_control.circle = {
        "shapeOptions": {
            "fillColor": "#efed69",
            "color": "#efed69",
            "fillOpacity": 1.0
        }
    }
    draw_control.rectangle = {
        "shapeOptions": {
            "fillColor": "#fca45d",
            "color": "#fca45d",
            "fillOpacity": 1.0
        }
    }

    m.add_control(draw_control)

    m

