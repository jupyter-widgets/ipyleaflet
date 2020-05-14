.. _usage-section:

Usage
=====

ipyleaflet is an interactive widgets library, it is based on `ipywidgets <https://github.com/jupyter-widgets/ipywidgets/>`_.
This means that everything in ipyleaflet (e.g. the ``Map``, ``TileLayers``, ``Markers``...) is interactive: you can dynamically update
attributes from Python or from the Notebook interface.

For example, you can create a ``Marker`` layer and interact with it:

.. code::

    from ipyleaflet import Map, Marker

    center = (52.204793, 360.121558)

    m = Map(center=center, zoom=15)

    marker = Marker(location=center, draggable=True)
    m.add_layer(marker);

    display(m)

    # Now that the marker is on the Map, you can drag it with your mouse,
    # it will automatically update the `marker.location` attribute in Python

    # You can also update the marker location from Python, that will update the
    # marker location on the Map:
    marker.location = (50, 356)

`ipywidgets <https://github.com/jupyter-widgets/ipywidgets/>`_ is powered by `traitlets <https://github.com/ipython/traitlets/>`_,
this brings an observer pattern implementation which allows you to react on widget attribute changes.

For example, you can define a Python callback that will be called whenever the marker location has changed:

.. code::

    def on_location_changed(event):
        # Do some computation given the new marker location, accessible from `event['new']`
        pass

    marker.observe(on_location_changed, 'location')

Please check out the `traitlets documentation <https://traitlets.readthedocs.io/>`_ for more details about the observer pattern implementation.

.. note::
    Everything in ipyleaflet **is** an interactive widget, from the ``Map`` class to ``Layer`` and ``Control`` classes. This means that what we
    achieved here with ``marker.location``, you can achieve it with ``map.zoom``, ``layer.url``, or ``heatmap.locations``

You can try ipyleaflet online using binder, no need to install anything on your computer:

.. image:: https://mybinder.org/badge_logo.svg
    :target: https://mybinder.org/v2/gh/jupyter-widgets/ipyleaflet/stable?filepath=examples
