Vector Tile Layer
=================

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, VectorTileLayer

    from traitlets import Unicode, Dict

    # This is a custom VectorTileLayer subclass, allowing to pass our api key to the url
    class CustomVectorTileLayer(VectorTileLayer):
        api_key = Unicode('gCZXZglvRQa6sB2z7JzL1w').tag(sync=True, o=True)

    water_style = dict(
    fill="true",
    weight=1,
    fillColor="#06cccc",
    color="#06cccc",
    fillOpacity=0.2,
    opacity=0.4,
    )

    waterway_style = dict(
        weight=1, fillColor="#2375e0", color="#2375e0", fillOpacity=0.2, opacity=0.4
    )

    admin_style = dict(
        weight=1, fillColor="pink", color="pink", fillOpacity=0.2, opacity=0.4
    )

    landcover_style = dict(
        fill="true",
        weight=1,
        fillColor="#53e033",
        color="#53e033",
        fillOpacity=0.2,
        opacity=0.4,
    )

    landuse_style = dict(
        fill="true",
        weight=1,
        fillColor="#e5b404",
        color="#e5b404",
        fillOpacity=0.2,
        opacity=0.4,
    )

    park_style = dict(
        fill="true",
        weight=1,
        fillColor="#84ea5b",
        color="#84ea5b",
        fillOpacity=0.2,
        opacity=0.4,
    )

    boundary_style = dict(
        weight=1, fillColor="#c545d3", color="#c545d3", fillOpacity=0.2, opacity=0.4
    )


    aeroway = dict(
        weight=1, fillColor="#51aeb5", color="#51aeb5", fillOpacity=0.2, opacity=0.4
    )

    road = dict(
        weight=1, fillColor="#f2b648", color="#f2b648", fillOpacity=0.2, opacity=0.4
    )

    transit = dict(
        weight=0.5, fillColor="#f2b648", color="#f2b648", fillOpacity=0.2, opacity=0.4
    )

    buildings = dict(
        fill="true",
        weight=1,
        fillColor="#2b2b2b",
        color="#2b2b2b",
        fillOpacity=0.2,
        opacity=0.4,
    )

    water_name = dict(
        weight=1, fillColor="#022c5b", color="#022c5b", fillOpacity=0.2, opacity=0.4
    )

    transportation_name = dict(
        weight=1, fillColor="#bc6b38", color="#bc6b38", fillOpacity=0.2, opacity=0.4
    )

    place = dict(
        weight=1, fillColor="#f20e93", color="#f20e93", fillOpacity=0.2, opacity=0.4
    )

    housenumber = dict(
        weight=1, fillColor="#ef4c8b", color="#ef4c8b", fillOpacity=0.2, opacity=0.4
    )

    poi = dict(weight=1, fillColor="#3bb50a", color="#3bb50a", fillOpacity=0.2, opacity=0.4)

    earth = dict(
        fill="true",
        weight=1,
        fillColor="#c0c0c0",
        color="#c0c0c0",
        fillOpacity=0.2,
        opacity=0.4,
    )

    url = 'https://tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt?api_key={apiKey}'
    vector_tile_layer_styles = dict(
        water=water_style,
        waterway=waterway_style,
        admin=admin_style,
        andcover=landcover_style,
        landuse=landuse_style,
        park=park_style,
        boundaries=boundary_style,
        aeroway=aeroway,
        roads=road,
        transit=transit,
        buildings=buildings,
        water_name=water_name,
        transportation_name=transportation_name,
        places=place,
        housenumber=housenumber,
        pois=poi,
        earth=earth
    )

    m = Map(center=(52.204793, 360.121558), zoom=9)
    vl = CustomVectorTileLayer(url=url, vector_tile_layer_styles=vector_tile_layer_styles)
    m.add_layer(vl)
    m


Attributes
----------

=========================    =================================================================================     =====================================================
Attribute                    Default Value                                                                         Doc
=========================    =================================================================================     =====================================================
url                          ''                                                                                    Url for the source protobuf data.
attribution                  'Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'     Attribution for the map.
vector_tile_layer_styles     {}                                                                                    Styles for the various data layer of protobuf layers.
=========================    =================================================================================     =====================================================
