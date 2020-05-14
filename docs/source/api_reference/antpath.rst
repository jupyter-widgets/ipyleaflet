AntPath
=======

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, AntPath

    m = Map(center=(51.332, 6.853), zoom=10)

    ant_path = AntPath(
        locations=[
            [51.185, 6.773], [51.182, 6.752], [51.185, 6.733], [51.194, 6.729],
            [51.205, 6.732], [51.219, 6.723], [51.224, 6.723], [51.227, 6.728],
            [51.228, 6.734], [51.226, 6.742], [51.221, 6.752], [51.221, 6.758],
            [51.224, 6.765], [51.230, 6.768], [51.239, 6.765], [51.246, 6.758],
            [51.252, 6.745], [51.257, 6.724], [51.262, 6.711], [51.271, 6.701],
            [51.276, 6.702], [51.283, 6.710], [51.297, 6.725], [51.304, 6.732],
            [51.312, 6.735], [51.320, 6.734], [51.326, 6.726], [51.334, 6.713],
            [51.340, 6.696], [51.344, 6.678], [51.349, 6.662], [51.354, 6.655],
            [51.360, 6.655], [51.366, 6.662], [51.369, 6.675], [51.373, 6.704],
            [51.376, 6.715], [51.385, 6.732], [51.394, 6.741], [51.402, 6.743],
            [51.411, 6.742], [51.420, 6.733], [51.429, 6.718], [51.439, 6.711],
            [51.448, 6.716], [51.456, 6.724], [51.466, 6.719], [51.469, 6.713],
            [51.470, 6.701], [51.473, 6.686], [51.479, 6.680], [51.484, 6.680],
            [51.489, 6.685], [51.493, 6.700], [51.497, 6.714]
        ],
        dash_array=[1, 10],
        delay=1000,
        color='#7590ba',
        pulse_color='#3f6fba'
    )

    m.add_layer(ant_path)

    m


Interactions
------------

Like most widgets in ipyleaflet, the ``AntPath`` can be dynamically updated from Python.

.. code::

    # Update the color
    ant_path.color = 'red'

    # Update the path
    ant_path.locations = [[51.185, 6.773], [51.326, 6.726], [51.497, 6.714]]


Attributes
----------

=====================    =====================   ===
Attribute                Default Value           Doc
=====================    =====================   ===
locations                []                      List of path points as (lat, lng) couples
color                    '#0000FF'               Background color for the path
pulse_color              '#FFFFFF'               Color of the moving ants on the path
paused                   False                   Whether the ants are moving or not
reverse                  False                   Whether the ants are moving in reverse or not
use                      'polyline'              Which shape is drawn, possible values are 'polyline', 'polygon', 'rectangle' and 'circle'
dash_array               [10, 20]                Dash pattern for lines as a list of non-negative numbers
weight                   5                       Lines weight
delay                    400                     Ants speed
radius                   10                      Radius of the circle, if ``use`` is set to 'circle'
=====================    =====================   ===
