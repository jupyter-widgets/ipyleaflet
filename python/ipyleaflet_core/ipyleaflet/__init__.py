# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

import sys
from ._version import  __version__  # noqa

from .leaflet import *  # noqa
from .basemaps import basemaps  # noqa

if "google.colab" in sys.modules:
    from google.colab import output

    output.enable_custom_widget_manager()
