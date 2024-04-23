# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

"""
This module defines all the basemaps. These basemaps are XYZ tile providers coming from:
https://github.com/geopandas/xyzservices
:class:`xyzservices.providers`
Examples:

>>> from ipyleaflet.basemaps import basemaps
>>> basemaps.OpenStreetMap.Mapnik
"""
import xyzservices.providers as basemaps  # noqa
