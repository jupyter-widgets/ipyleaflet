.. raw:: html
    :file: embed_widgets/velocity.html

Velocity
========

Example
-------

.. code::

    from ipyleaflet import Map, Velocity, TileLayer, basemaps
    import xarray as xr

    center = [0, 0]
    zoom = 1
    m = Map(center=center, zoom=zoom, interpolation='nearest', basemap=basemaps.CartoDB.DarkMatter)

    ds = xr.open_dataset('wind-global.nc')
    display_options = {
        'velocityType': 'Global Wind',
        'displayPosition': 'bottomleft',
        'displayEmptyString': 'No wind data'
    }
    wind = Velocity(data=ds,
                    zonal_speed='u_wind',
                    meridional_speed='v_wind',
                    latitude_dimension='lat',
                    longitude_dimension='lon',
                    velocity_scale=0.01,
                    max_velocity=20,
                    display_options=display_options)
    m.add_layer(wind)

    m

.. raw:: html

    <script type="application/vnd.jupyter.widget-view+json">
    {
        "version_major": 2,
        "version_minor": 0,
        "model_id": "af27d37e7ba1467aa55ad523f5f5032e"
    }
    </script>

Attributes
----------


======================    ===================================================================    ====
Attribute                 Default Value                                                          Doc
======================    ===================================================================    ====
data                      Empty dataset                                                          Underlying dataset
zonal_speed               ''                                                                     Variable name in underlying dataset for the zonal speed
meridional_speed          ''                                                                     Variable name in underlying dataset for the meridional speed
latitude_dimension        'latitude'                                                             Name of the latitude dimension in underlying dataset
longitude_dimension       'longitude'                                                            Name of the longitude dimension in underlying dataset
units                     None                                                                   Units
display_values            True                                                                   Display velocity data on mouse hover
display_options           {}                                                                     Display options
min_velocity              0.0                                                                    Used to align color scale
max_velocity              10.0                                                                   Used to align color scale
velocity_scale            0.005                                                                  Modifier for particle animations
color_scale               []                                                                     Array of hex/rgb colors for user-specified color scale.
======================    ===================================================================    ====
