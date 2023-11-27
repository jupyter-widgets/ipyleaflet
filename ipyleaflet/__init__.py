# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.
#

import sys
from ._version import version_info, __version__  # noqa

from .leaflet import *  # noqa
from .basemaps import basemaps   # noqa

if "google.colab" in sys.modules:
    from google.colab import output

    output.enable_custom_widget_manager()


def _jupyter_labextension_paths():
    return [{
        'src': 'labextension',
        'dest': 'jupyter-leaflet'
    }]


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension',
        'dest': 'jupyter-leaflet',
        'require': 'jupyter-leaflet/extension'
    }]
