# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

"""
This module defines HERE basemaps, these basemaps are defined here:
https://github.com/geopandas/xyzservices
"""

from traitlets import Bunch
from ipyleaflet import basemap_to_tiles  # noqa
import xyzservices.providers as xyz

basemaps = Bunch(HERE=xyz.HERE, HEREv3=xyz.HEREv3)
