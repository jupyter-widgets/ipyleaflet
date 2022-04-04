Velocity
========

Example
-------

.. jupyter-execute::

    from ipyleaflet import Map, TileLayer, basemaps
    from ipyleaflet.velocity import Velocity
    import xarray as xr
    import os

    if not os.path.exists('wind-global.nc'):
      url = 'https://github.com/benbovy/xvelmap/raw/master/notebooks/wind-global.nc'
      import requests
      r = requests.get(url)
      wind_data = r.content
      with open('wind-global.nc', 'wb') as f:
          f.write(wind_data)

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


Attributes
----------

.. autoclass:: ipyleaflet.velocity.Velocity
   :members:
