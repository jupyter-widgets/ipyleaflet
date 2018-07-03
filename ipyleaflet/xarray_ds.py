def ds_x_to_json(ds, widget):
    return ds2json(
            ds,
            widget.zonal_speed,
            widget.meridional_speed,
            widget.latitude_dimension,
            widget.longitude_dimension,
            widget.units
            )

def ds2json(ds, u_var, v_var, lat_dim='latitude', lon_dim='longitude', units=None):
    """
    Assumes that the velocity components are given on a regular grid
    (fixed spacing in latitude and longitude).

    Parameters
    ----------
    u_var : str
        Name of the U-component (zonal) variable.
    v_var : str
        Name of the V-component (meridional) variable.
    lat_dim : str, optional
        Name of the latitude dimension/coordinate
        (default: 'latitude').
    lon_dim : str, optional
        Name of the longitude dimension/coordinate
        (default: 'longitude').
    units : str, optional
        Velocity units (default: try getting units from the
        'units' attributes of `u_var` and `v_var`).
    """
    import numpy as np
    ds = ds.copy()
    for var_name in (u_var, v_var):
        var_dims = ds[var_name].dims

        if set(var_dims) != set([lat_dim, lon_dim]):
            raise ValueError(
                "Invalid dimensions for variable '{}' in Dataset: "
                "should include only {}, found {}."
                .format(var_name, (lat_dim, lon_dim), var_dims)
            )

        # If dataset contains nans replace with 0
        ds[var_name] = ds[var_name].fillna(0)

    if units is None:
        u_var_units = ds[u_var].attrs.get('units')
        v_var_units = ds[v_var].attrs.get('units')

        if u_var_units != v_var_units:
            raise ValueError(
                "Different units found for U-component '{}' and "
                "V-component '{}' variables: '{}' and '{}'"
                .format(u_var, v_var, u_var_units, v_var_units))

        units = u_var_units

    if units is None:
        units = ''

    # Data should be in gaussian grid format (latitudes descending)
    if np.any(np.diff(ds[lat_dim].values) >= 0):
        ds = ds.sel(**{lat_dim: slice(None, None, -1)})

    # infer grid specifications (assume a rectangular grid)
    lat = ds[lat_dim].values
    lon = ds[lon_dim].values

    lon_left = float(lon.min())
    lon_right = float(lon.max())
    lat_lower = float(lat.min())
    lat_upper = float(lat.max())

    dx = float((lon_right - lon_left) / (lon.size - 1))
    dy = float((lat_upper - lat_lower) / (lat.size - 1))

    nx = lon.size
    ny = lat.size

    u_v_spec = ([2, 3],
                ["Eastward current", "Northward current"],
                [u_var, v_var])

    velocity_data = []

    for p_number, p_name, var_name in zip(*u_v_spec):
        velocity_data.append({
            "header": {
                "parameterUnit": units,
                "parameterNumber": p_number,
                "dx": dx, "dy": dy,
                "parameterNumberName": p_name,
                "la1": lat_upper,
                "la2": lat_lower,
                "parameterCategory": 2,
                "lo2": lon_right,
                "nx": nx,
                "ny": ny,
                "refTime": "2017-02-01 23:00:00",
                "lo1": lon_left
                },
            "data": ds[var_name].values.flatten().tolist()
        })

    return velocity_data
