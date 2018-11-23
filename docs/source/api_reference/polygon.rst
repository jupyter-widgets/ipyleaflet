.. raw:: html
    :file: embed_widgets/polygon.html

Polygon/Multipolygon
====================

Example Polygon
---------------

.. code::

    from ipyleaflet import Map, Polygon

    polygon = Polygon(
        locations=[(42, -49), (43, -49), (43, -48)],
        color="green",
        fill_color="green"
    )

    m = Map(center=(42.5531, -48.6914), zoom=6)
    m.add_layer(polygon);

    m

.. raw:: html

  <script type="application/vnd.jupyter.widget-view+json">
  {
    "model_id": "c7eeeba10da14d6d952eb47205ba4e79",
    "version_major": 2,
    "version_minor": 0
  }
  </script>
  <div style ="height:30px;"> </div>



Example Polygon with hole
-------------------------

.. code::

  from ipyleaflet import Map, Polygon

  hole_polygon = Polygon(
      locations= [[(37, -109.05),(41, -109.03),(41, -102.05),(37, -102.04)],
      [(37.29, -108.58),(40.71, -108.58),(40.71, -102.50),(37.29, -102.50)]],

      color="green",
      fill_color="green"
  )

  m = Map(center=(37.5531, -109.6914), zoom=5)
  m.add_layer(hole_polygon);

  m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
    "version_major": 2,
    "version_minor": 0,
    "model_id": "e65df81e068740a88e660f6ba3048314"
    }
    </script>
    <div style ="height:30px;"> </div>


Example Multipolygon
--------------------

.. code::

    from ipyleaflet import Map, Polygon

    multipolygon = Polygon(
            locations=[[(42, -49), (43, -49), (43, -48)],[(44,-49),(43, -50),(44,-50)]],
            color="green",
            fill_color="green"
        )

    m = Map(center=(42.5531, -48.6914), zoom=6)
    m.add_layer(multipolygon);

    m

.. raw:: html


  <script type="application/vnd.jupyter.widget-view+json">
  {
  "model_id": "b7217555f2714518948d9bbd47acf23c",
  "version_major": 2,
  "version_minor": 0
  }
  </script>
  <div style ="height:30px;"> </div>






Attributes
----------

=============    ================   ===
Attribute        Default Value      Doc
=============    ================   ===
locations        []                 List of points of the polygon
stroke           True               Set it to `False` to disable borders
color            "#0033FF"          Color of the stroke
opacity          1.0                Opacity of the stroke
weight           5                  Width of the stroke in pixels
fill             True               Whether to fill the polygon or not
fill_color       "#0033FF"
fill_opacity     0.2
dash_array
line_cap         "round"
line_join        "round"
=============    ================   ===
