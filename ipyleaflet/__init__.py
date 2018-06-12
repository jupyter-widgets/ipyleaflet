from ._version import version_info, __version__

from .leaflet import *
from .xarray_ds import ds2json

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter-leaflet',
        'require': 'jupyter-leaflet/extension'
    }]
