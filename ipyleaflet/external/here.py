# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

"""
This module helps build configurable HERE map tiles URLs.
These HERE map tiles URLs need to have credentials available when registering
for a free HERE developer account (this code currently supports the legacy
APP_CODE/APP_ID and the new APIKEY mechanisms), see:

- https://developer.here.com
- https://developer.here.com/documentation/authentication/dev_guide/index.html

Further information about the HERE map tiles can be found here:

- https://developer.here.com/documentation#maps_section
- https://developer.here.com/documentation/map-tile/dev_guide/topics/introduction.html
"""

import os
import random

from traitlets.utils.bunch import Bunch

from ipyleaflet import TileLayer


def build_tiles_url(**kwargs):
    """Return a HERE map tiles URL configured by keyword arguments.

    The ``kwargs`` should contain API parameters, e.g. ``maptile="base"``
    as described in the documentation mentioned below. Some defaults are
    pre-set, but can be overwritten by keyword parameters.
    Two authentication mechanisms can be used, either the new APIKEY
    mechanism introduced in December 2019) or the legacy APP_CODE/APP_ID,
    looked-up in this order in the keyword parameters (``apikey``,
    ``app_code``, and ``app_id``) or the respective environment variables
    (``HEREMAPS_APIKEY``. ``HEREMAPS_APP_CODE``. and ``HEREMAPS_APP_ID``).

    More information about available parameters and combinations to be
    passed in ``kwargs`` can be found here:
    https://developer.here.com/documentation/map-tile/dev_guide/topics/resource-base-tile-intro.html

    Examples:

    >>> build_tiles_url(apikey="foobar")
    'https://3.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&apiKey=foobar'
    >>>
    >>> build_tiles_url(app_id="foo", app_code="bar", mayptype="traffic", \
                        tiletype="traffictile")
    'https://4.traffic.maps.api.here.com/maptile/2.1/traffictile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&app_id=foo&app_code=bar'
    """
    params = dict(
        server=random.choice("1234"),
        maptype="base",
        tiletype="maptile",
        scheme="normal.day",
        tilesize="256",
        tileformat="png8",
        lg="eng",
        # x, y, and z will remain unchanged in the resulting URL.
        x="{{x}}",
        y="{{y}}",
        z="{{z}}",
    )
    params.update(kwargs)
    tiles_url = (
        "https://{server}.{maptype}.{{api_url}}"
        "/maptile/2.1/{tiletype}/newest/{scheme}/{z}/{x}/{y}/{tilesize}/{tileformat}"
        "?lg={lg}"
    ).format(**params)

    # Use new APIKEY if provided.
    apikey = kwargs.get("apikey", None) or os.getenv("HEREMAPS_APIKEY", None)
    if apikey:
        tiles_url = tiles_url.format(api_url="maps.ls.hereapi.com")
        tiles_url += f"&apiKey={apikey}"
        return tiles_url

    # Or use legacy APP_CODE and APP_ID if provided, instead.
    app_code = kwargs.get("app_code", None) or os.getenv("HEREMAPS_APP_CODE", None)
    app_id = kwargs.get("app_id", None) or os.getenv("HEREMAPS_APP_ID", None)
    if app_code and app_id:
        tiles_url = tiles_url.format(api_url="maps.api.here.com")
        tiles_url += f"&app_id={app_id}&app_code={app_code}"
        return tiles_url

    raise ValueError(
        "HERE APIKEY or APP_CODE/APP_ID needed in params or env. variables. "
        "For more information please type 'help(build_tiles_url)'.")


def basemap_to_tiles(basemap, **kwargs):
    """Return a TileLayer instance with information for HERE map tiles.

    Example:

    >>> basemap_to_tiles(apikey="foobar")
    {'url': 'https://3.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&apiKey=foobar',
     'min_zoom': 1,
     'max_zoom': 18,
     'attribution': '&copy; <a href="https://here.com">HERE.com</a>',
     'name': 'HERE'}
    """
    return TileLayer(
        url=build_tiles_url(**basemap, **kwargs),
        min_zoom=kwargs.get("min_zoom", 1),
        max_zoom=kwargs.get("max_zoom", 18),
        attribution='&copy; <a href="https://here.com">HERE.com</a>',
        name="HERE." + kwargs.get("scheme", "normal.day"),
        **kwargs
    )


basemaps = Bunch(
    Default=dict(
        maptype="base", tiletype="maptile", scheme="normal.day"),
    Satellite=dict(
        maptype="aerial", tiletype="maptile", scheme="satellite.day"),
    TrafficDay=dict(
        maptype='traffic', tiletype='traffictile', scheme="normal.day"),
    TrafficNight=dict(
        maptype='traffic', tiletype='traffictile', scheme="normal.night"),
    TransitDay=dict(
        maptype='base', tiletype='maptile', scheme="normal.day.transit"),
    TransitNight=dict(
        maptype='base', tiletype='maptile', scheme="normal.night.transit")
)
