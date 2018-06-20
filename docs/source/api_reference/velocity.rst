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
                    u_var='u_wind',
                    v_var='v_wind',
                    lat_dim='lat',
                    lon_dim='lon',
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


===============    ===================================================================    ====
Attribute          Default Value                                                          Doc
===============    ===================================================================    ====
u_var              ''                                                                     Variable name in underlying dataset for `u`
v_var              ''                                                                     Variable name in underlying dataset for `v`
lat_dim            'latitude'                                                             Coordinate name for the lattitude
lon_dim            'longitude'                                                            Coordinate name for the longitude
units              None                                                                   Units
data               Empty dataset                                                          Underlying dataset
display_values     True                                                                   Display velocity data on mouse hover
display_options    {}                                                                     Display options
min_velocity       0.0                                                                    Used to align color scale
max_velocity       10.0                                                                   Used to align color scale
velocity_scale     0.005                                                                  Modifier for particle animations
color_scale        []                                                                     Array of hex/rgb colors for user-specified color scale.
===============    ===================================================================    ====

