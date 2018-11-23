.. raw:: html
    :file: embed_widgets/polyline.html

Polyline
========

Example Polyline
----------------

.. code::

    from ipyleaflet import Map, Polyline

    line = Polyline(
        locations = [[
        [[45.51, -122.68],
         [37.77, -122.43],
         [34.04, -118.2]],]],
        color = "green" ,
        fill_color= "green")
    m = Map(center = (42.5, -41), zoom =2)
    m.add_layer(line)
    m

.. raw:: html


  <script type="application/vnd.jupyter.widget-view+json">
  {
    "version_major": 2,
    "version_minor": 0,
    "model_id": "cbf43b94f6d7401ca5317f74a25984b8"
  }
  </script>
  <div style ="height:30px;"> </div>




Example MultiPolyline
---------------------


.. code::

      from ipyleaflet import Map, Polyline

      line = Polyline(
          locations = [
          [[45.51, -122.68],
          [37.77, -122.43],
          [34.04, -118.2]],
          [[40.78, -73.91],
          [41.83, -87.62],
          [32.76, -96.72]]
          ],
          color = "green" ,
          fill_color= "green")
      m = Map(center = (42.5, -41), zoom =2)
      m.add_layer(line)
      m

.. raw:: html

  <script type="application/vnd.jupyter.widget-view+json">
  {
  "version_major": 2,
  "version_minor": 0,
  "model_id": "81c1f9b6408b4f6ca157ba9dbcb2ac77"
  }
  </script>
  <div style ="height:30px;"> </div>




Attributes
----------

=============    ================   ===
Attribute        Default Value      Doc
=============    ================   ===
locations        [[]]               List of list of points of the polygon
stroke           True               Set it to `False` to disable borders
color            "#0033FF"          Color of the stroke
opacity          1.0                Opacity of the stroke
weight           5                  Width of the stroke in pixels
fill             True               Whether to fill the polyline or not
fill_color       "#0033FF"
fill_opacity     0.2
dash_array
line_cap         "round"
line_join        "round"
=============    ================   ===
