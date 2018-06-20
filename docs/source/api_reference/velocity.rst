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

Attributes
----------


==============    ===================================================================    ====
Attribute         Default Value                                                          Doc
==============    ===================================================================    ====
u_var             ''                                                                     variable name in underlying dataset for `u`
v_var             ''                                                                     variable name in underlying dataset for `v`
lat_dim           'latitude'                                                             coordinate name for the lattitude
lon_dim           'longitude'                                                            coordinate name for the longitude
units             None                                                                   units
data              Default xarray dataset                                                 underlying dataset
display_values    True                                                                   display options
display_options   {
                      'velocityType': 'Global Wind',
                      'position': 'bottomleft',
                      'emptyString': 'No velocity data',
                      'angleConvention': 'bearingCW',
                      'displayPosition': 'bottomleft',
                      'displayEmptyString': 'No velocity data',
                      'speedUnit': 'kt'
                  }
min_velocity      0.0                                                                    Used to align color scale
max_velocity      10.0                                                                   Used to align color scale
velocity_scale    0.005                                                                  Modifier for particle animations
color_scale =     [                                                                      Array of hex/rgb colors for user-specified color scale.
                      "rgb(36,104, 180)",
                      "rgb(60,157, 194)",
                      "rgb(128,205,193)",
                      "rgb(151,218,168)",
                      "rgb(198,231,181)",
                      "rgb(238,247,217)",
                      "rgb(255,238,159)",
                      "rgb(252,217,125)",
                      "rgb(255,182,100)",
                      "rgb(252,150,75)",
                      "rgb(250,112,52)",
                      "rgb(245,64,32)",
                      "rgb(237,45,28)",
                      "rgb(220,24,32)",
                      "rgb(180,0,35)"
                  ]

==============    ===================================================================    ====

